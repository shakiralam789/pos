export function extractDate(dateString) {
    return dateString.split("T")[0];
}

export function isValidNumberInRange(
    inputValue,
    minValue = 0,
    maxValue = Infinity
) {
    const numberValue = Number(inputValue);
    if (
        !isNaN(numberValue) &&
        numberValue >= minValue &&
        numberValue <= maxValue
    ) {
        return true;
    }
    return false;
}

export const rangeMsg = "Amount will be max 999999999999.99";

export function formatNumber(number, locale = "en_US") {
    let updatedCode = locale.replace("_", "-");
    return new Intl.NumberFormat(updatedCode).format(number);
}

export function toNumberWithTwoDecimals(value, locale = "en_US", symbol = "$") {
    return isNaN(Number(value))
        ? symbol + " " + formatNumber("0.00", locale)
        : symbol + " " + formatNumber(Number(value).toFixed(2), locale);
}

export function toNumber(value) {
    const num = Number(value);
    return isNaN(num) ? 0 : num;
}

export function isNumber(value) {
    const numberValue = Number(value);

    if (!isNaN(numberValue) || value === "-") {
        return true;
    }

    return false;
}

export function isInteger(value) {
    // Allow empty string for clearing input
    if (value === "" || value === "-" || /^-?\d+$/.test(value)) {
        return true;
    }
    return false;
}

export function handleCopyLink({ content }) {
    const link = content;

    if (navigator.clipboard) {
        navigator.clipboard
            .writeText(link)
            .then(() => {
                console.log("Link copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy the link: ", err);
            });
    } else {
        // Fallback for browsers without Clipboard API support
        const textArea = document.createElement("textarea");
        textArea.value = link;
        textArea.style.position = "fixed"; // Avoid scrolling to bottom
        textArea.style.opacity = "0"; // Hide element visually
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand("copy");
            console.log(
                successful ? "Link copied to clipboard!" : "Failed to copy link"
            );
        } catch (err) {
            console.error("Fallback: Oops, unable to copy", err);
        }

        document.body.removeChild(textArea);
    }
}


export function formatDateToYYYYMMDD(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

export function handleBack() {
    window.history.back();
}

export function getQueryParamsFromUrl() {
    const queryParams = new URLSearchParams(window.location.search);
    const query = {};
    for (const [key, value] of queryParams.entries()) {
        query[key] = value;
    }
    return query;
}
