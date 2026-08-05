

import React, { useRef } from 'react';
import { Box, Input, Text, Stack, Icon, useColorModeValue, Button, Textarea, Alert } from '@chakra-ui/react';
import { FiUpload } from 'react-icons/fi';
import axios from 'axios';

interface FileUploadBoxProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  multiple?: boolean;
}


const FileUploadBox: React.FC<FileUploadBoxProps> = ({ onFileSelect, accept, multiple = false }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [resultText, setResultText] = React.useState('');
  const [error, setError] = React.useState('');
  const [voiceFile, setVoiceFile] = React.useState<File | null>(null);
  const [voiceLoading, setVoiceLoading] = React.useState(false);
  const [transcript, setTranscript] = React.useState('');

  // 通常ファイル選択→/file/transcribe
  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    setFile(file);
    setResultText('');
    setError('');
    onFileSelect(file);
    // API呼び出し
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/fileupload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResultText(res.data.text || '');
    } catch (e: any) {
      setError(e?.response?.data?.error || 'アップロード失敗');
    } finally {
      setLoading(false);
    }
  };


  const bg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'gray.600');

  return (
    <Box
      p={4}
      borderWidth={2}
      borderStyle="dashed"
      borderColor={borderColor}
      borderRadius="md"
      bg={bg}
      textAlign="center"
      cursor="pointer"
      onClick={handleClick}
      _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
    >
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        onChange={handleChange}
        accept={accept}
        multiple={multiple}
        aria-label="ファイル"
      />
      <Stack align="center" spacing={2}>
        <Icon as={FiUpload} boxSize={8} />
        <Text>ファイルをドラッグ＆ドロップするか、クリックして選択してください</Text>
      </Stack>
      {loading && <Text color="blue.500">アップロード中...</Text>}
      {error && <Alert status="error" mt={2}>{error}</Alert>}
      {resultText && (
        <Textarea value={resultText} readOnly mt={2} minH="100px" />
      )}
    </Box>
  );
};

export default FileUploadBox;
