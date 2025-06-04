export const renderStars = (score: number) => {
    const stars = [];
    const fullStars = Math.floor(score / 2); // 가득 찬 별 개수
    const hasHalfStar = score % 2 >= 1; // 0.5 이상이면 반 개

    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={`full-${i}`}>★</span>);
    }
    if (hasHalfStar) {
        stars.push(<span key="half">☆</span>); // 반 개 대신 비워진 별 (아이콘 변경 가능)
    }
    const remaining = 5 - stars.length;
    for (let i = 0; i < remaining; i++) {
        stars.push(<span key={`empty-${i}`}>☆</span>);
    }

    return stars;
    };
