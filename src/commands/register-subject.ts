import { API_ROOT } from "@/queries/config";

export async function registerSubject(subjectId: string): Promise<void> {
  const registrationRes = await fetch(
    `${API_ROOT}/me/registrations/${subjectId}`,
    {
      credentials: "include",
      method: "PUT",
    },
  );
  if (!registrationRes.ok) {
    throw new Error(
      `registration of subject (${subjectId}) failed: ${await registrationRes.text()}`,
    );
  }
  const subjectRes = await fetch(`${API_ROOT}/subjects/${subjectId}`, {
    credentials: "include",
  });
  const { boards } = (await subjectRes.json()) as {
    boards: {
      id: string;
      startFrom: string;
      secondsFromStartToBeLate: number;
      secondsFromBeLateToEnd: number;
    }[];
  };

  const now = Math.floor(Date.now() / 1000);
  const hasActiveBoard = boards.some(
    ({ startFrom, secondsFromStartToBeLate, secondsFromBeLateToEnd }) => {
      const startSec = Math.floor(new Date(startFrom).valueOf() / 1000);
      return (
        startSec <= now &&
        now < startSec + secondsFromStartToBeLate + secondsFromBeLateToEnd
      );
    },
  );
  if (hasActiveBoard) {
    location.href = "/";
  } else {
    location.href = "/add-subject/";
  }
}
