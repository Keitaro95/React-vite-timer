import FileUploadBox from "./FileBox/fileBox"


export const Page = () => {
    const sendQuestion = () => {
    if (!question.trim()) {
      return;
    }
    onSend(question);
    setQuestion("");
  };

    const makeApiRequest = async (data: object) => {
        setIsLoading(true);
        setIsError(false);

        const api_host = import.meta.env.VITE_API_ENDPOINT || "";
        const api_url = `${api_host}/api/fileupload`;

        try {
        const response = await fetch(api_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(history),
        });

        const answer = await response.json();
        setIsLoading(false);
        setAnswers([...answers, { user: question, response: answer.answer }]);
        } catch (error) {
        setIsError(true);
        setIsLoading(false);
        }
    };



    return(


        <FileUploadBox file={file}/>
        <Button
            colorScheme="blue"
            px={8}
            onClick={sendQuestion}
            onSend={(q) => makeApiRequest(q)} isLoading={isLoading}
            isLoading={isLoading}
        >申請する
        </Button>
    )
}