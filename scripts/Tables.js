function mainTableBuilder() {
    var myTableDiv = document.getElementById("myDynamicTable");

    var table = document.createElement('TABLE');
    table.className = "superTable";

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    StreamerTable.forEach(streamer => {
        var td = document.createElement('TD');
        td.appendChild(buildStreamerBlock(streamer));
        tr.appendChild(td);
    });
    myTableDiv.appendChild(table);
}
/*
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
*/
function buildStreamerBlock(/*String*/ Streamer) {
    var tableBody = document.createElement('table');
    tableBody.className = "tables"

    var topRow = document.createElement('tr');
    {
        var cell = document.createElement('td');
        var profilePic = document.createElement('img');
        profilePic.src = Streamer.profile;
        profilePic.className = "profile";
        profilePic.alt = Streamer.name;
        cell.appendChild(profilePic);
        topRow.appendChild(cell);
    }

    {
        var cell = document.createElement('td');
        var name = document.createElement('p');
        name.innerHTML = Streamer.name;
        name.class     ="centerText";
        cell.appendChild(name);
        var twitchLink = document.createElement('a');
        twitchLink.href = Streamer.twitchLink;
        var twitchPic = document.createElement('img');
        twitchPic.className = "twitch";
        twitchLink.appendChild(twitchPic);
        cell.appendChild(twitchLink);
        topRow.appendChild(cell);
    }

    tableBody.appendChild(topRow)
    var bottomRow = document.createElement('tr');

    return tableBody;
}
console.log(StreamerTable);
mainTableBuilder();