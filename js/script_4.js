let quotes = [
    ["Non multa, sed multum", "Не много, но о многом"],
    ["Vita brevis, ars longa.", "Жизнь коротка, искусство - вечно."],
    ["Historia est magistra vita. ", "История - учительница жизни."],

    ["Per aspera ad astra! ", "Через тернии - к звездам"],
    ["Dum spiro, spero", "Пока дышу - надеюсь"],
    ["Cogito ergo sum.", "Мыслю, следовательно существую."],

    ["Мыслю, следовательно существую.", "В здоровом теле здоровый дух."],
    ["Tempora mutantur et nos mutamur in illis.", "Времена меняются, и мы меняемся вместе с ними."]
]

let free_quotes = Array.from({ length: quotes.length }, (_, i) => i)


let count = 0;

function create()
{  
    if (free_quotes.length == 0) {
        alert("Фразы закончились!")
        return
    }

    let rand = document.getElementById("rand");
    let v_scet_n = document.createElement("p");
    v_scet_n.setAttribute('id', "n" + count);

    let rand_index = free_quotes[Math.floor(Math.random() * free_quotes.length)]

    let underlining = document.createElement("u");
    let v_id = document.createTextNode("n=" + count);
    underlining.appendChild(v_id);
    
    let italic = document.createElement("i");
    let italic_text = document.createTextNode(quotes[rand_index][0]);
    italic.appendChild(italic_text)

    let v_text = document.createTextNode(quotes[rand_index][1]);
    v_scet_n.appendChild(underlining);
    v_scet_n.appendChild(italic);
    v_scet_n.appendChild(v_text);

    v_scet_n.classList.add((count + 1) % 2 == 0 ?'class1' : 'class2');

    rand.appendChild(v_scet_n);

    free_quotes = free_quotes.filter(i => i != rand_index);
    count++;
}

function repaint()
{
    for(let i=0; i<count; i++)
    {
        if(i % 2 == 0)
        {
            let row = document.getElementById("n" + i);
            row.style.cssText = "font-weight: bold";
        }
    }
}