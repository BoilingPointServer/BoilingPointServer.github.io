var superTable = {
    windowWidth : window.innerWidth,
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
    let count = 1;
    let table = document.createElement('TABLE');
    table.className = "superTable";

    let elementWidth = 350;
    let pagewidth = superTable.windowWidth;
    let elementsPerLine = Math.floor(pagewidth/elementWidth) ;
    console.log(elementsPerLine + " this the number")
    superTable.validRange.low = elementsPerLine * elementWidth;
    superTable.validRange.high = (elementsPerLine*elementWidth) + 349; 

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
        count++;
        if(count > elementsPerLine)
        {
            tr = document.createElement('TR');
            tableBody.appendChild(tr);
            count = 1;
        }
        

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
            let cell1 = document.createElement('td');
            topRow.appendChild(cell1);
            let profilePic = document.createElement('img');
            cell1.appendChild(profilePic);
            profilePic.src = Streamer.profile;
            profilePic.className = "profile";
            profilePic.alt = Streamer.name;
    
            let cell2 = document.createElement('td');
            topRow.appendChild(cell2);
            let name = document.createElement('p');
            cell2.appendChild(name);
            name.innerHTML = Streamer.name;
            name.className ="centerText";
            //TODO - don't add nulls for twitch links
            let twitchLink = document.createElement('a');
            cell2.appendChild(twitchLink);
            twitchLink.href = Streamer.twitchLink;
            twitchLink.target = "_blank";
            let twitchPic = document.createElement('img');
            twitchLink.appendChild(twitchPic);
            twitchPic.className = "twitch";

        tableBody.appendChild(topRow)
        let bottomRow = document.createElement('tr');
        tableBody.appendChild(bottomRow);
        //TODO implement bottom row of table
        let cell3 = document.createElement('td');
        bottomRow.appendChild(cell3);
        cell3.colSpan = 2;
        let Video = document.createElement('video');
        Video.className = "introSize";
        Video.autoplay = true;
        Video.loop = true;
        Video.muted = true;
        cell3.appendChild(Video);
        let source = document.createElement('source');
        source.src = Streamer.introVideo; 
        source.type = "video/mp4";
        Video.appendChild(source);

        return tableBody;
    }

    function WindowResize(){
        let pageWidth = window.innerWidth;
        superTable.windowWidth = window.innerWidth; 
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
