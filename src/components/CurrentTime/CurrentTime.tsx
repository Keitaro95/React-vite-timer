// components/CurrentTime/CurrentTime.tsx
import { useState, useEffect } from "react";
import type { HHMM } from "../../types/time";
import { getCurrentHHMM } from "../../services/timeServiceApi";
import { Box, Heading, Text, Spinner, Center } from "@chakra-ui/react";

export const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<HHMM>("--:--");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentHHMM()
      .then((hhmm) => {
        setCurrentTime(hhmm);
      })
      .catch((err: Error) => {
        console.error(err);
        setError("時刻取得に失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box p={6} bg="gray.50" rounded="md" shadow="sm">
      <Heading as="h1" size="md" mb={4}>
        現在の時刻
      </Heading>

      {loading ? (
        <Center>
          <Spinner size="lg" />
        </Center>
      ) : error ? (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      ) : (
        <Text fontSize="3xl" fontWeight="bold" color="teal.600">
          {currentTime}
        </Text>
      )}
    </Box>
  );
};
