function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

class OSWindow {
    title = "Window";

    constructor(title, url, id) {
        this.title = title;
        this.url = url;
        if ( id == undefined ) {
            this.id = Math.floor(Math.random() * 10000000);
        } else {
            this.id = id;
        }

        

        // document.getElementById('win-container').appendChild(this.render());
        // console.log(this.render());
        

        // this.link();
    }

    render () {
        let element = document.createElement("div");
        element.classList.add("window");
        element.id = "win-" + this.id;

        let e_titlebar = document.createElement("div");
        e_titlebar.classList.add("titlebar");

        let e_title = document.createElement("div");
        e_title.classList.add("title");
        e_title.id = "win-" + this.id + "-titlebar";
        e_title.innerHTML = this.title;

        let e_btn_1 = document.createElement("div");
        e_btn_1.id = "win-" + this.id + "-minimize";
        e_btn_1.classList.add("btn", "hidden"); // HIDDEN FOR NOW
        let e_i_1 = document.createElement("i");
        e_i_1.classList.add("fa-solid", "fa-window-minimize");
        e_btn_1.appendChild(e_i_1);

        let e_btn_2 = document.createElement("div");
        e_btn_2.id = "win-" + this.id + "-maximize";
        e_btn_2.classList.add("btn");
        let e_i_2 = document.createElement("i");
        e_i_2.classList.add("fa-solid", "fa-window-maximize");
        e_btn_2.appendChild(e_i_2);
        
        let e_btn_3 = document.createElement("div");
        e_btn_3.id = "win-" + this.id + "-close";
        e_btn_3.classList.add("btn");
        let e_i_3 = document.createElement("i");
        e_i_3.classList.add("fa-solid", "fa-xmark");
        e_btn_3.appendChild(e_i_3);

        e_titlebar.appendChild(e_title);
        e_titlebar.appendChild(e_btn_1);
        e_titlebar.appendChild(e_btn_2);
        e_titlebar.appendChild(e_btn_3);

        let e_iframe = document.createElement("iframe");
        e_iframe.id = "win-" + this.id + "-iframe";
        e_iframe.src = this.url;

        let e_cont = document.createElement("div")
        e_cont.classList.add("content");
        e_cont.appendChild(e_iframe);

        element.appendChild(e_titlebar);
        element.appendChild(e_cont);

        return element;
    }

    link () {
        let element = document.getElementById("win-" + this.id);
        dragElement(element);

        element.style.top = document.getElementById("win-container").clientHeight / 2 - 700 / 2 + "px";
        element.style.left = document.getElementById("win-container").clientWidth / 2 - 1300 / 2 + "px";
        element.style.width = 1300 + "px";
        element.style.height = 700 + "px";

        document.getElementById("win-" + this.id + "-titlebar").onclick = this.focus;
        document.getElementById("win-" + this.id + "-minimize").onclick = this.minimize;
        document.getElementById("win-" + this.id + "-maximize").onclick = this.maximize;
        document.getElementById("win-" + this.id + "-close").onclick = this.close;
    }

    focus () {
        bring_window_to_top(this.id.replace("win-", "").replace("-titlebar", ""));
    }

    minimize () {
        document.getElementById(this.id.replace("-minimize", "")).classList.add("hidden");
    }

    minimize () {
        document.getElementById(this.id.replace("-minimize", "")).classList.add("hidden");
    }

    maximize () {
        let w = document.getElementById("win-container").clientWidth;
        let h = document.getElementById("win-container").clientHeight;
        let element = document.getElementById(this.id.replace("-maximize", ""));
        bring_window_to_top(element.id.replace("win-", ""));
        console.log(element.style.top)

        if (
            element.clientWidth + 4 == w && 
            element.clientHeight + 4 == h && 
            element.style.top == "0px" && 
            element.style.left == "0px"
        ) {
            element.style.top = h / 2 - 700 / 2 + "px";
            element.style.left = w / 2 - 1300 / 2 + "px";
            element.style.width = 1300 + "px";
            element.style.height = 700 + "px";
        } else {
            element.style.top = 0 + "px";
            element.style.left = 0 + "px";
            element.style.width = w + "px";
            element.style.height = h + "px";
        }
    }

    close () {
        remove_windo(this.id.replace("win-", "").replace("-close", ""))
    }

}