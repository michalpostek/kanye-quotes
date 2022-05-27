document.addEventListener('DOMContentLoaded', () => {
    const quoteWrapper = document.querySelector('.quote');
    const quoteOutput = document.querySelector('.quote__text');
    const errorOutput = document.querySelector('.error');
    const copyQuoteBtn = document.querySelector('#copyQuoteBtn');
    const newQuoteBtn = document.querySelector('#newQuoteBtn');

    const showQuote = quote => {
        quoteWrapper.classList.remove('hidden');
        errorOutput.classList.add('hidden');
        quoteOutput.textContent = quote;
    }

    const showError = error => {
        quoteWrapper.classList.add('hidden');
        errorOutput.classList.remove('hidden');
        errorOutput.textContent = error;
    }

    const copyToClipboard = text => navigator.clipboard.writeText(text);

    const fetchQuote = async () => {
        try {
            const res = await fetch('https://api.kanye.rest/');
            const data = await res.json();
            return data;
        } catch (error) {
            return error;
        }
    }

    fetchQuote()
        .then(data => showQuote(data.quote))
        .catch(error => showError(error));

    copyQuoteBtn.addEventListener('click', () => {
        copyToClipboard(quoteOutput.textContent);
    });

    newQuoteBtn.addEventListener('click', () => {
        fetchQuote()
            .then(data => showQuote(data.quote))
            .catch(error => showError(error));
    });
});
