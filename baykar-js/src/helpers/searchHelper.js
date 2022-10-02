export const searchHelper = (items, q, f, s) => {
    return items.filter((item) => {
        if (item.region == f) {
            return s.some((newItem) => {
                if (typeof item[newItem] == "object") {
                    return (
                        JSON.stringify(item[newItem])
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                } else {
                    return (
                        item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) >
                        -1
                    );
                }
            });
        } else if (f == "All") {
            return s.some((newItem) => {
                if (typeof item[newItem] == "object") {
                    return (
                        JSON.stringify(item[newItem])
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                } else {
                    return (
                        item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) >
                        -1
                    );
                }
            });
        }
    });
};