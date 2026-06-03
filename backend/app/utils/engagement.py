def calculate_engagement_rate(likes: int, comments: int, views: int) -> float:
    if views == 0:
        return 0.0
    rate = ((likes + comments) / views) * 100
    return round(rate, 4)