var superTable = {
    windowWidth : 100,
    validRange :{low:0,high:0},
    div :   document.getElementById("myDynamicTable"),
    members: []
};

function Initialize(){
    StreamerTable.forEach(streamer => {
        let member = buildStreamerBlockHTML(streamer);
        superTable.members.push(member);
    });
}

function GenSuperTable(){
    let table = document.createElement('TABLE');
    table.className = "superTable";

    let tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    let tr = document.createElement('TR');
    tableBody.appendChild(tr);
    console.log("building table with "+superTable.members.length+" members in it.");
    //TODO-> Use the window size and an Element size to autoformat the page.
    //Determine how many colloms you can have, and then find the range of valid widths and set it.
    superTable.members.forEach(streamer => {
        let td = document.createElement('TD');
        td.appendChild(streamer);
        tr.appendChild(td);
    });
    return table;
}


function rebuildSuperTable() {
    if(superTable.div.hasChildNodes()){
        superTable.div.childNodes.forEach(child=>{
            child.remove();
        });
    }
    superTable.div.appendChild(GenSuperTable());
}


/* ------Start Template-----
<table class="tables">
    <tr>
        <td><img src=$(Profile) class="profile" alt=$(Name) loading="lazy"></td>
        <td> <p class="centerText">$(Name)</p><a href=$(twitchLink) target="_blank"><img class="twitch"></a></td>
    </tr>
    <tr>
        <td colspan="2">
        <video  class = "introSize" autoplay loop muted>
            <source src=$(IntroVid) type="video/mp4"></video>
        </td>
    </tr>
</table>
    ------End Template-----*/ 
    //----------------Built by writing the actual HTML to make the layout.
    function buildStreamerBlockHTML(/*String*/ Streamer) {
        let tableBody = document.createElement('table');
        tableBody.className = "tables"
    
        let topRow = document.createElement('tr');
        {
            let cell = document.createElement('td');
            let profilePic = document.createElement('img');
            profilePic.src = Streamer.profile;
            profilePic.className = "profile";
            profilePic.alt = Streamer.name;
            cell.appendChild(profilePic);
            topRow.appendChild(cell);
        }
    
        {
            let cell = document.createElement('td');
            let name = document.createElement('p');
            name.innerHTML = Streamer.name;
            name.class     ="centerText";
            cell.appendChild(name);
            let twitchLink = document.createElement('a');
            twitchLink.href = Streamer.twitchLink;
            let twitchPic = document.createElement('img');
            twitchPic.className = "twitch";
            twitchLink.appendChild(twitchPic);
            cell.appendChild(twitchLink);
            topRow.appendChild(cell);
        }

        tableBody.appendChild(topRow)
        let bottomRow = document.createElement('tr');
    
        return tableBody;
    }

    function WindowResize(){
        let pageWidth = window.innerWidth;
        console.log("The window has been resized so Width:"+ pageWidth);

        if(!SuperTableValid()){
            console.log("table is no longer valid");
            rebuildSuperTable();
        }else{
            console.log("table is still valid");
        }
    }

    function SuperTableValid(){
        return (superTable.windowWidth < superTable.validRange.high && superTable.windowWidth > superTable.validRange.low );
    }

Initialize();
rebuildSuperTable();
console.log(StreamerTable);
window.onresize = WindowResize;
