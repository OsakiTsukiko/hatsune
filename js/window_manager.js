let win_stack = [];

function wm_unload_screens () {
    let elements = document.getElementsByClassName("screen");
    for ( element of elements ) {
        element.classList.add("hidden");
    }
}

function wm_load_screen ( screen ) {
    wm_unload_screens();

    let elements = document.getElementsByClassName(screen + "-screen");
    for ( element of elements ) {
        element.classList.remove("hidden");
    }
}

function window_manager_init () {
    wm_unload_screens();
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "-titlebar")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "-titlebar").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

function open_window (title, url) {
    let win = new OSWindow(title, url);
    win_stack.push(win);
    document.getElementById('win-container').appendChild(win.render());
    win.link();
    do_zindex_check();
}

function do_zindex_check () {
  for ( win in win_stack ) {
    let id = win_stack[win].id;
    document.getElementById("win-" + id).style.zIndex = 100 + win / 1;
  }
}

function bring_window_to_top (id) {
  for ( win in win_stack ) {
    if (win_stack[win].id == id) {
      let tmp = win_stack[win];
      win_stack.splice(win, 1);
      win_stack.push(tmp);
      break;
    }
  }

  do_zindex_check();
}

function remove_windo (id) {
  for ( win in win_stack ) {
    if (win_stack[win].id == id) {
      let tmp = win_stack[win];
      win_stack.splice(win, 1);
      document.getElementById("win-" + tmp.id)?.remove();
      break;
    }
  }

  do_zindex_check();
}

// App Selector

function close_app_selector() {
  document.getElementById("app-selector").classList.add("hidden");
  document.getElementById("app-selector-inp").value = "";
}

function open_app_selector() {
  document.getElementById("app-selector-inp").value = "";
  filter_apps("");
  document.getElementById("app-selector").classList.remove("hidden");
}

function app_selector_inp_change() {
  let val = document.getElementById("app-selector-inp").value;
  val = val.toLowerCase().replaceAll(" ", "");
  filter_apps(val);
}

function filter_apps (input) {
  let cont = document.getElementById("app-selector-cont");
  cont.innerHTML = "";
  cont.removeChild
  for ( app of config.apps ) {
    if ( app.id.includes(input) ) {
      /* let e_app = document.createElement("div");
      e_app.onclick = function () {
        close_app_selector();
        open_window(app.name, app.url);
      };
      e_app.classList.add("app");
      
      let e_icon = document.createElement("div");
      e_icon.classList.add("icon");
      
      let e_img = document.createElement("img");
      e_img.src = app.icon;
      e_icon.appendChild(e_img);

      let e_name = document.createElement("div");
      e_name.classList.add("name");
      e_name.textContent = app.name;

      e_app.appendChild(e_icon);
      e_app.appendChild(e_name);

      cont.appendChild(e_app); */
      console.log(app);
      cont.innerHTML += `
      <div class="app" onclick="close_app_selector();open_window('${app.name}', '${app.url}');">
        <div class="icon"><img src="${app.icon}"></div>
        <div class="name">${app.name}</div>
      </div>
      `;
    }
  }
}