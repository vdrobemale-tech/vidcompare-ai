from langchain.prompts import PromptTemplate

IMPROVEMENT_PROMPT_TEMPLATE = """
You are a social media growth expert.
Based on the transcript and performance data of Video A and Video B, suggest specific, actionable improvements.

Context:
{context}

Chat History:
{chat_history}

Question: {question}

Instructions:
- Focus on hook strength, pacing, hashtag strategy, and engagement triggers.
- Reference specific chunks from either video to support your suggestions.
- Prioritize improvements that would have the highest impact on engagement.
- Structure your response with clear headings.

Answer:
"""

IMPROVEMENT_PROMPT = PromptTemplate(
    input_variables=["context", "chat_history", "question"],
    template=IMPROVEMENT_PROMPT_TEMPLATE,
)