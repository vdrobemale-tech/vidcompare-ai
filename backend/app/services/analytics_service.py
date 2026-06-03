from app.core.logging import setup_logger

logger = setup_logger(__name__)


def generate_comparison_insights(video_a: dict, video_b: dict) -> dict:
    logger.info("Generating comparison insights")

    engagement_winner = (
        "A" if video_a["engagement_rate"] >= video_b["engagement_rate"] else "B"
    )
    views_winner = "A" if video_a["views"] >= video_b["views"] else "B"
    likes_winner = "A" if video_a["likes"] >= video_b["likes"] else "B"

    insights = []

    if video_a["engagement_rate"] > video_b["engagement_rate"]:
        diff = round(video_a["engagement_rate"] - video_b["engagement_rate"], 2)
        insights.append(
            f"Video A has {diff}% higher engagement rate than Video B."
        )
    else:
        diff = round(video_b["engagement_rate"] - video_a["engagement_rate"], 2)
        insights.append(
            f"Video B has {diff}% higher engagement rate than Video A."
        )

    if video_a["views"] > video_b["views"]:
        insights.append("Video A has more views.")
    else:
        insights.append("Video B has more views.")

    if len(video_a.get("hashtags", [])) > len(video_b.get("hashtags", [])):
        insights.append("Video A uses more hashtags.")
    elif len(video_b.get("hashtags", [])) > len(video_a.get("hashtags", [])):
        insights.append("Video B uses more hashtags.")

    return {
        "engagement_winner": engagement_winner,
        "views_winner": views_winner,
        "likes_winner": likes_winner,
        "insights": insights,
    }