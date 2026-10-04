const WEBHOOK_URL = process.env.NEXT_PUBLIC_COURSE_SHEETS_WEBHOOK_URL || '';

export const postToSheet = async (payload: Record<string, string>): Promise<void> => {
  if (!WEBHOOK_URL) return;

  await fetch(WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify(payload),
  });
};

export const postToSheetBestEffort = async (payload: Record<string, string>): Promise<void> => {
  try {
    await postToSheet(payload);
  } catch {
    // Sheets mirror is best-effort; never block the primary submit flow.
  }
};
