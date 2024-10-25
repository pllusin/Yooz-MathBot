class YoozParser {
    constructor() {
        this.patterns = [];
    }

    parse(input) {
        const patternRegex = /\(\s*\+\s*(.*?)\s*-\s*(.*?)\s*\)/gs;
        let match;

        while ((match = patternRegex.exec(input)) !== null) {
            const userPattern = match[1].trim();
            const botResponses = match[2].split('_').map(response => response.trim());
            this.patterns.push({ userPattern, botResponses });
        }
    }

    getResponse(userMessage) {
        for (let pattern of this.patterns) {
            const { userPattern, botResponses } = pattern;
            const regexPattern = this.createRegex(userPattern);
            const match = userMessage.match(regexPattern);

            if (match) {
                let response = botResponses[Math.floor(Math.random() * botResponses.length)];
                return this.resolveResponse(response, match);
            }
        }
        return "متاسفم، متوجه نشدم.";
    }

    createRegex(pattern) {
        return new RegExp(`^${pattern.replace(/\*([0-9]*)/g, '(.*?)')}$`);
    }

    resolveResponse(response, match) {
        let resolvedResponse = response;
        for (let i = 1; i < match.length; i++) {
            resolvedResponse = resolvedResponse.replace(`*${i}`, match[i].trim());
        }
        return eval(resolvedResponse.replace(/[^0-9\+\-\*\/\.\(\)\ ]/g, '')); // محاسبه جواب نهایی
    }
}
