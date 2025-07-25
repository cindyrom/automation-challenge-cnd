class utilities {
    getByCssSelector(selector, ...args) {
        return cy.get(`[data-qa="${selector}"]`, ...args);
    }
    getById(selector, ...args) {
        return cy.get(`#${selector}`, ...args);
    }
    getByButtonClass(selector, ...args) {
        return cy.get(`button[class="${selector}"]`, ...args);
    }
    getByClass(selector, ...args) {
        return cy.get(`[class="${selector}"]`, ...args);
    }
    getByName(selector, ...args) {
        return cy.get(`[name="${selector}"]`, ...args);
    }
    getByData(selector, ...args) {
        return cy.get(`[data-at="${selector}"]`, ...args);
    }
    getByType(selector, ...args) {
        return cy.get(`[type="${selector}"]`, ...args);
    }
     getByTag(selector, ...args) {
        return cy.get(`<${selector}>`, ...args);
    }
    getRandomData(json) {
        const data = {};
        for (let key in json) {
            const values = json[key];
            const randomIndex = Math.floor(Math.random() * values.length);
            data[key] = values[randomIndex];
        }
        return data;
    }
}
export default utilities;
