// Soluzione Esercizio 1
/**
 * Restituisce il valore massimo in un array di numeri.
 * @param {number[]} arr - Un array di numeri.
 * @throws {Error} Lancia un errore se l'array è vuoto o non è un array.
 * @returns {number} Il valore massimo nell'array.
 */
function getMaxValue(arr) {
    // Verifico che l'input sia un array non vuoto
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("L'array non deve essere vuoto");
    }
    // Ritorna il valore massimo dell'array
    // Math.max() restituisce il numero più grande tra gli argomenti passati
    // (...arr) è uno spread operator che permette di passare un array come argomento di una funzione
    // Dunque da [1, 2, 3] ottengo (1, 2, 3) in questo modo Math.max() li può leggere come argomenti
    return Math.max(...arr);
}

/*
// Soluzione Esercizio 1 (senza Math.max - Soluzione meno elegante)
function getMaxValue(arr) {
    // Inizia con il primo elemento dell'array
    var max = arr[0];
    // Ciclo for che parte dal secondo elemento dell'array fino all'ultimo (arr.length - 1)
    for (var i = 1; i < arr.length; i++) {
        // Verifica se l'elemento corrente è maggiore dell'attuale max
        if (arr[i] > max)
            // Se è maggiore, allora aggiorna il valore corrente a max
            max = arr[i];
    }
    // Ritorna il valore massimo
    return max;
}
*/

// Soluzione Esercizio 2
/**
 * Restituisce una promessa che si risolve con il valore 42 dopo 1 secondo (1000 millisecondi).
 * @returns {Promise<number>} Una promessa che si risolve con il numero 42.
 */
function getAnswer() {
    // Creazione di una promessa che accetta una funzione di callback che ha 1 parametro 
    // (Solitamente si inseriscono sia resolve che reject per gestire un eventuale errore)
    return new Promise((resolve) => {
        // Eseguo la funzione di callback
        setTimeout(() => {
            // Chiama la funzione resolve passando il valore 42
            resolve(42);
        }, 1000);
    });
}

// Soluzione Esercizio 3
/**
 * Inverte una stringa data.
 * @param {string} str - La stringa da invertire.
 * @throws {Error} Lancia un errore se l'input non è una stringa.
 * @returns {string} La stringa invertita.
 */
function reverseString(str) {
    // Verifico che l'input sia una stringa
    if (typeof str !== 'string') {
        throw new Error("L'argomento passato deve essere una stringa");
    }
    // Inverte la stringa
    // 1. split() divide la stringa in un array di caratteri
    // Es input: "ciao" -> ["c", "i", "a", "o"]
    // 2. reverse() inverte l'ordine degli elementi dell'array
    // Es: ["c", "i", "a", "o"] -> ["o", "a", "i", "c"]
    // 3. join() unisce gli elementi dell'array in una stringa
    // Es output: ["o", "a", "i", "c"] -> "oaic"
    return str.split('').reverse().join('');
}

/*
// Soluzione Esercizio 3 (senza split, reverse e join - Soluzione meno elegante)
function reverseString(str) {
    // Variabile che conterrà la stringa invertita (attualmente vuota)
    var reverse = "";
    // Ciclo for che parte dalla fine della stringa e termina all'inizio
    for (var i = str.length - 1; i >= 0; i--) {
        // Aggiungo il carattere corrente alla stringa invertita
        reverse += str[i];
    }
    // Ritorno la stringa invertita
    return reverse;
}
*/

// Soluzione Esercizio 4
/**
 * Restituisce la temperatura massima per la data corrente a Urbino.
 * @async
 * @returns {Promise<number>} Una promessa che si risolve con la temperatura massima.
 * @throws {Error} Lancia un errore se la richiesta HTTP fallisce o se si verificano errori quando vengo ottenuti i dati.
 */
async function getWeather() {
    // Latitudine di Urbino
    const LATITUDE_HERE = 43.726256;
    // Longitudine di Urbino
    const LONGITUDE_HERE = 12.636563;
    // URL a cui fare la richiesta HTTP
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${LATITUDE_HERE}&longitude=${LONGITUDE_HERE}&hourly=temperature_2m`;

    try {
        // Effettua la richiesta HTTP
        const response = await fetch(url);
        // Converto la risposta in JSON
        const data = await response.json();
        // Estraggo le temperature orarie
        const temperatures = data.hourly.temperature_2m;
        // Ottengo la data corrente nel formato YYYY-MM-DD
        const today = new Date().toISOString().split('T')[0];

        // Filtra le temperature per la giornata corrente
        const todayTemperatures = temperatures.filter((_, index) => data.hourly.time[index].startsWith(today));
        // Riutilizzo la funzione getMaxValue
        return getMaxValue(todayTemperatures);

        // Volendo si poteva fare anche così (Soluzione più elegante)
        // return todayTemperatures.length ? getMaxValue(todayTemperatures) : null;
    } catch (error) {
        // Gestione dell'errore
        throw new Error("Errore nella richiesta meteo: " + error.message);
    }
}


/**
* Non modificare il codice al di sotto di questa riga
*/
async function _main() {
    var args = process.argv.slice(2);
    const array = stringToArray(args[0]);
    const string = args[1];
    console.log("*********************************** START ***********************************")
    // Esercizio 1
    try {
        if (!Array.isArray(array)) throw Error("Il valore passato non è un array");
        if (array.length === 0) throw Error("L'array non contiene elementi");
        const maxArray = getMaxValue(array);
        if (typeof maxArray !== 'number') throw Error("Il valore massimo dell'array non è un numero");
        console.log(`Il valore massimo dell'array è ${maxArray}`);
    } catch (error) {
        console.log("Function getMaxValue: " + error.message || "Errore non gestito");
    }
    // Esercizio 2
    try {
        await getAnswer().then((value) => {
        if (value !== 42) throw Error("Il valore ritornato dalla promessa non è 42");
        console.log(`Il valore ritornato dalla promessa è ${value}`);
        }).catch((error) => {
            console.log("Function getPromise: " + error.message || "Errore non gestito");
        })
        } catch (error) {
            console.log("Function getPromise: " + error.message || "Errore non gestito");
        }
    // Esercizio 3
    try {
        const reverse = reverseString(string);
        if (typeof reverse !== 'string') throw Error("Il valore ritornato dalla funzione non è una stringa");
        console.log(`La stringa invertita è ${reverse}`);
        } catch (error) {
            console.log("Function reverseString: " + error.message || "Errore non gestito");
        }
    // Esercizio 4
    try {
        await getWeather().then((maxTemperature) => {
            if (typeof maxTemperature !== 'number') throw Error("Non è stato possibile recuperare la temperatura");
        console.log(`La temperatura massima prevista per oggi è ${maxTemperature} gradi`);
        }).catch((error) => {
        console.log("Function getWeather: " + error.message || "Errore non gestito");
        })
    } catch (error) {
        console.log("Function getWeather: " + error.message || "Errore non gestito");
    }
        console.log("************************************ END ************************************")
}

function stringToArray(str) {
    var arr = [];
    if (str?.indexOf('[', 0) > -1 && str?.indexOf(']', 0) > -1)
    {
    arr = JSON.parse(str);
    } else {
    arr.push(str);
    }
    return arr;
}

_main();
