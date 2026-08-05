
import React from "react";
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileUploadBox from './fileBox';

vi.mock('axios');
import axios from 'axios';

const mockOnFileSelect = vi.fn();

describe('FileUploadBox', () => {
  beforeEach(() => {
    mockOnFileSelect.mockClear();
    vi.clearAllMocks();
  });

  it('ファイル選択時にonFileSelectとAPI呼び出しが行われ、テキストが表示される', async () => {
    (axios.post as any).mockResolvedValueOnce({ data: { text: '抽出テキスト' } });
    render(<FileUploadBox onFileSelect={mockOnFileSelect} />);
    const input = screen.getByLabelText(/ファイル/i);
    const file = new File(['dummy'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(mockOnFileSelect).toHaveBeenCalledWith(file);
    expect(await screen.findByText('アップロード中...')).toBeInTheDocument();
    expect(await screen.findByDisplayValue('抽出テキスト')).toBeInTheDocument();
  });

  it('APIエラー時はエラーメッセージが表示される', async () => {
    (axios.post as any).mockRejectedValueOnce({ response: { data: { error: 'サーバーエラー' } } });
    render(<FileUploadBox onFileSelect={mockOnFileSelect} />);
    const input = screen.getByLabelText(/ファイル/i);
    const file = new File(['dummy'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(await screen.findByText('サーバーエラー')).toBeInTheDocument();
  });

  it('クリックでファイル選択ダイアログが開く', () => {
    render(<FileUploadBox onFileSelect={mockOnFileSelect} />);
    const box = screen.getByText(/ファイルをドラッグ＆ドロップ/).closest('div');
    const input = screen.getByLabelText(/ファイル/i);
    const clickSpy = vi.spyOn(input, 'click');
    fireEvent.click(box!);
    expect(clickSpy).toHaveBeenCalled();
  });

  it('音声ファイルアップロードUIが存在する', () => {
    render(<FileUploadBox onFileSelect={mockOnFileSelect} />);
    expect(screen.getByTestId('voice-upload-input')).toBeInTheDocument();
    expect(screen.getByTestId('voice-upload-submit')).toBeInTheDocument();
  });

  it('音声ファイルアップロード時にAPI呼び出しとtranscript表示', async () => {
    (axios.post as any).mockResolvedValueOnce({ data: { transcript: '音声認識結果' } });
    render(<FileUploadBox onFileSelect={mockOnFileSelect} />);
    const input = screen.getByTestId('voice-upload-input');
    const file = new File(['dummy'], 'voice.wav', { type: 'audio/wav' });
    fireEvent.change(input, { target: { files: [file] } });
    const btn = screen.getByTestId('voice-upload-submit');
    fireEvent.click(btn);
    expect(btn).toBeDisabled();
    expect(await screen.findByDisplayValue('音声認識結果')).toBeInTheDocument();
  });

  it('accept, multiple propsがinputに反映される', () => {
    render(<FileUploadBox onFileSelect={mockOnFileSelect} accept=".pdf,.docx" multiple />);
    const input = screen.getByLabelText(/ファイル/i);
    expect(input).toHaveAttribute('accept', '.pdf,.docx');
    expect(input).toHaveAttribute('multiple');
  });
});
