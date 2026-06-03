import re


def clean_transcript(text: str) -> str:
    # Remove timestamps like [00:01] or (00:01)
    text = re.sub(r"[\[\(]\d{1,2}:\d{2}[\]\)]", "", text)

    # Remove speaker labels like "Speaker 1:" or "Host:"
    text = re.sub(r"^[A-Za-z\s]+:\s", "", text, flags=re.MULTILINE)

    # Remove music/sound tags like [Music] [Applause]
    text = re.sub(r"\[.*?\]", "", text)

    # Remove extra whitespace and newlines
    text = re.sub(r"\s+", " ", text)

    # Strip leading/trailing whitespace
    text = text.strip()

    return text