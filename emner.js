var valgt_fag;
var valgt_emne;
var underemne;
var ep_emne;

var h3_top_position;

var active_state = 0;

$(document).ready(function() {

    init();
    $(".btn-fag").click(clicked_fag); //
    $('#instruction').html(instruction("Få inspiration til et godt EP-emne ved at vælge en af de populære fagkombinationer og se emneforslag for hver kombination."));
    $('#explanation').html(explanation("Start med at vælge en fagkombination og få inspiration til emner til dit Eksamensprojekt. Du kan søge på både bibliotek.dk og udvalgte databaser, når du har indsnævret dit emnevalg."));
    $(".emne_header").hide();
});


function init() {

    var HTML = ""; //<button type='button' class='btn'>"+ jsonData.fag[0].id +"</button>";
    for (var i = 0; i < jsonData.fag.length; i++) {
        HTML += "<button type='button' class='btn btn-default btn-fag'>" + jsonData.fag[i].id + "</button>";
    }

    $(".fag_content").html(HTML);

    reposContent(0);

}


function reposContent(indeks) {
    if (indeks != 4) {
        h3_top_position = $(".valg_container").eq(indeks).position().top;
    }
    console.log("h3_top_position: " + h3_top_position);

    $(".img_container").animate({
        top: h3_top_position
    }, 300, function() {
        $(".bullseye_pic").fadeOut(0, function() {
            $(".bullseye_pic").attr("src", "img/bullseye" + indeks + ".svg").fadeIn(0); //.fadeIn(50);
        });
    });
}



function clicked_fag() {

    $(".emne_header").show();

    var indeks = $(this).index();

    toggleClasses(".btn-fag", indeks);

    //activateClass($(this), indeks);

    var HTML = "";

    for (var i = 0; i < jsonData.fag[indeks].emner.length; i++) {
        HTML += "<div class='emne_buttons col-xs-12'>";
        HTML += "<div class='emne_text col-xs-6'>" + jsonData.fag[indeks].emner[i][0] + "</div><div class='btn_container col-xs-6'><button class='btn btn-sm btn-info btn-bib'>Søg på bibliotek.dk</button><button class='btn btn-sm btn-info btn-google'>Søg i databaser</button></div></div>";
    }

    $(".emne_content").html(HTML); // + "</div><div class='col-xs-4'></div>"); //<img class='img-responsive bullseye' src='img/bullseye1.svg'>");
    $(".emne_content").slideUp(0).slideDown(300);


    reposContent(1);
    valgt_fag = indeks;


    //() {
    $(".btn-emne").each(function() {
        var indeks = $(this).index();
        $(this).fadeOut(100).delay(indeks * 100).fadeIn(100);
    });

    $(".btn-google").click(clicked_google_search);
    $(".btn-bib").click(clicked_bib_search);


    //alert("Clicked fag");
    // HOVER function: 
    $(".emne_buttons").on('mouseover touchstart', function() {

        var indeks = $(this).index(".emne_buttons");





        if (jsonData.fag[valgt_fag].emner[indeks][2]) {

            microhint($(this), "<h4 class='mh_header'>" + jsonData.fag[valgt_fag].emner[indeks][0] + "</h4>" + jsonData.fag[valgt_fag].emner[indeks][2]);
        } else {
            microhint($(this), "Der er ikke noget info");
        }
    });

    $(".emne_content").mouseout(function() {
        $(".microhint").hide();
    })

}


function clicked_emne() {
    var indeks = $(this).index();

    toggleClasses(".btn-emne", indeks);

    $(".sso_emne_content").html("");

    //alert(indeks);

    var HTML = "<div class='button_container'>";

    for (var i = 0; i < jsonData.fag[valgt_fag].underemner[indeks].length; i++) {
        console.log("i: " + i);
        HTML += "<button type='button' class='btn btn-default btn-underemne'>" + jsonData.fag[valgt_fag].underemner[indeks][i] + "</button>";
    }

    $(".u_emne_content").html(HTML + "</div><div class='col-xs-4'></div>"); //<img class='img-responsive bullseye' src='img/bullseye2.svg'>");

    //$(".u_emne_content").slideUp(0);
    //$(".u_emne_content").slideDown(500);

    $(".btn-underemne").click(clicked_underemne);
    $(".bullseye").css("opacity", 0.3);
    $(".bullseye").eq(0).css("opacity", .6);
    $(".bullseye").eq(1).css("opacity", 1);
    $(".u_emne_content").slideUp(0).slideDown(300);

    $(".btn-underemne").each(function() {
        var indeks = $(this).index();

        $(this).fadeOut(0).delay(indeks * 100).fadeIn(1000);
    })


    reposContent(2);
    valgt_emne = indeks;

}

function clicked_underemne() {

    var indeks = $(this).index();

    toggleClasses(".btn-underemne", indeks);

    //alert(indeks);

    var HTML = "<div class='button_container'>";

    //+ "</div><div class='col-xs-4'></div>"); //<img class='img-responsive bullseye' src='img/bullseye3.svg'>");
    //$(".sso_emne_content").slideUp(0);
    //$(".sso_emne_content").slideDown(500);
    $(".sso_emne_content").slideUp(0).slideDown(300);
    //$(".sso_emne_content").append("");

    $(".btn-bib, .btn-google").hide();

    $(".btn-google").click(clicked_google_search);
    $(".btn-bib").click(clicked_bib_search);


    //$(".btn-underemne").click(clicked_underemne);
    $(".btn-ssoemne").click(clicked_ssoemne);



    $(".bullseye").css("opacity", 0.2);
    $(".bullseye").eq(1).css("opacity", .6);
    $(".bullseye").eq(2).css("opacity", 1);

    //microhint($(".btn-ssoemne").eq(0), "Når du klikker på et SSO emne åbner en ny fane med din søgning <br/> Du kan også skrive din egen søgning ind i søgefeltet");
    $(".btn-ssoemne").each(function() {
        var indeks = $(this).index();

        $(this).fadeOut(0).delay(indeks * 100).fadeIn(1000);
    })



    reposContent(3);
    underemne = indeks;

}

function clicked_ssoemne(obj) {
    //alert(obj);
    var indeks = obj.index(".btn-emne");
    console.log("Indeks: " + indeks + " Valgt fag: " + valgt_fag + "Valgt emne: " + jsonData.fag[valgt_fag].emner[indeks]); //[underemne][indeks]);

    $(".btn_container").eq(indeks).html("<div class='search_container'></div>");




    /*var HTML = "";

    for (var i = 0; i < jsonData.fag[valgt_fag].length; i++) {
        console.log("i: " + i);
        HTML += "<div class='btn-ssoemne col-xs-8'>" + jsonData.fag[valgt_fag].sso_emner[valgt_emne][indeks][i].replace("#db_noshow#", "") + "</div><div class='search_container col-xs-4'><button class='btn btn-sm btn-info btn-bib'>Søg på bibliotek.dk</button><button class='btn btn-sm btn-info btn-google'>Søg i databaser</button></div>";
    }*/

    //$(".emne_content").html(HTML);



    $(".btn-bib, .btn-google").show();


    toggleClasses(".btn-ssoemne", indeks);

    //console.log(jsonData.fag[valgt_fag].sso_emner[valgt_emne][underemne][indeks].indexOf("#db_noshow#"));

    $(".btn-google").eq(indeks).fadeIn(200);

    if (jsonData.fag[valgt_fag].emner[valgt_emne]) { //.indexOf("#db_noshow#") > -1) {
        //alert("ramt");
    } else {
        $(".btn-bib").eq(indeks).fadeIn(200);
    }



    reposContent(4);
    sso_emne = indeks;



}

function clicked_google_search() {
    var indeks = $(this).index(".btn-google");
    //toggleClasses(".btn-ssoemne", indeks);


    console.log("indeks: " + indeks);

    //var searchstring = $(".emne_text").eq(indeks).html();
    var searchstring = jsonData.fag[valgt_fag].emner[indeks][0];

    var databases = "";

    for (var i = jsonData.fag[valgt_fag].databaser.length - 1; i >= 0; i--) {
        console.log(jsonData.fag[valgt_fag].databaser[i]);

        databases = databases + jsonData.fag[valgt_fag].databaser[i][1] + " OR ";
    }

    databases = databases + "site:denstoredanske.dk "


    searchstring = encodeURI(searchstring);

    setTimeout(function() {
        window.open("http://www.google.dk/?#q=" + searchstring + " site:" + databases);
    }, 0)
    /*
        var Databases = "";
        $("input:checked").each(function(index, element) {

            //console.log();
            Databases += ((index > 0) ? "+OR+" : "") + " site:" + $(this).attr("value");
            //console.log("Databases: " + Databases);
        });
        //console.log("Search - Databases: " + Databases);

        var URL = 'http://www.google.dk/?#q=';

        if (SearchText.length > 0) {
            URL += "+" + SearchText.replace(/\ +/g, "+");
            $("#SearchTextParent").removeClass("ErrorColor"); // NEW
            // $("#SearchText").attr("placeholder", SearchPlaceholderMemory);  // Inset old placeholder text again.
            // $("#SearchText").next().fadeOut("slow");  // OLD
        } else {
            // $("#SearchText").next().text("Skriv nogle søgeord her!").fadeIn("slow");  // OLD
            $("#SearchTextParent").addClass("ErrorColor"); // NEW
            // $("#SearchText").attr("placeholder","Skriv nogle søgeord her!").fadeIn("slow");  // NEW
            return 0;
        }

        //console.log("jsonData.DropDowns[0].obj.options[0]: " + JSON.stringify(jsonData.DropDowns[0].obj.options[0].value));
        URL += Databases;

        //console.log("Search - URL: " + URL);

        window.open(URL, '_blank');
    */
    //    


}

function clicked_bib_search() {

    var indeks = $(this).index(".btn-bib");



    console.log("indeks: " + indeks);

    //var searchstring = $(".emne_text").eq(indeks).html();

    var searchstring = jsonData.fag[valgt_fag].emner[indeks][1];
    //alert(searchstring);

    //searchstring = searchstring.replace(/\?/g, '')


    // microhint($(this), "Du bliver nu sendt videre til bibliotek.dk med din søgning: '" + searchstring + "'");

    searchstring = encodeURI(searchstring);

    setTimeout(function() {
        window.open("https://bibliotek.dk/linkme.php?cql=" + searchstring);
        //window.open("http://www.google.dk/?#q=" + searchstring);
    }, 0)
}

function toggleClasses(klasse, indeks) {

    $(klasse).removeClass("btn-primary").addClass("btn-default").css("opacity", ".5");
    $(klasse).eq(indeks).addClass("btn-primary").removeClass("btn-default").css("opacity", "1");

}