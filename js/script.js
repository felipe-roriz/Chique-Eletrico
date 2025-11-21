// SCRIPT DA PÁGINA MATERIAS
var tabMat = new Array(7);
tabMat[0] = ["Cabo Flexível", "Sil Preto 2,5 mm", "100m", "Preço R$ 190,00", "SilPreto2p5_150"];
tabMat[1] = ["Cabo Flexível", "Cabrom", "100m", "Preço R$ 190,00", "CobrecomAzul2p5_150"];
tabMat[2] = ["Cabo Flexível", "Sil Verde 2,5 mm", "50m", "Preço R$ 150,00", "SilVerde2p5_150"];
tabMat[3] = ["Terminais Ilhós", "2,5mm", "200 peças", "Preço R$ 30,00", "TermIlhos2p5_150"];
tabMat[4] = ["Terminais Ilhós", "4mm", "100 peças", "Preço R$ 20,00", "TermIlhos4_150"];
tabMat[5] = ["Conduíte", "Plastilit 1/2", "25m", "Preço R$ 50,00", "Plastlit1b2_150"];
tabMat[6] = ["Conduíte", "Plastilit 3/4", "50m", "Preço R$ 100,00", "Plastlit3b4_150"];

function Materiais(tipo) {
    var jan = window.open(
        "",
        tabMat[tipo][0],
        "location=no,status=no,width=350,height=410"
    );

    var doc = jan.document;
    doc.open();
    doc.write("<!DOCTYPE html>");
    doc.write("<html><head><title>ChiqueElétrico</title>");
    doc.write("<link rel='stylesheet' type='text/css' href='../css/ChiqueEletrico.css'>");
    doc.write("<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Karla|Stoke'>");
    doc.write("</head><body>");
    doc.write("<div class='Materias'>");
    doc.write("<h3>" + tabMat[tipo][0] + "</h3>");
    doc.write("<p>" + tabMat[tipo][1] + "</p>");
    doc.write("<p><img src='../Imagens/" + tabMat[tipo][4] + ".jpg' /></p>");
    doc.write("<p>" + tabMat[tipo][3] + "</p>");
    doc.write("<p>" + tabMat[tipo][2] + "</p>");
    doc.write("<form><input type='button' value='Fechar' onClick='window.close();'/></form>");
    doc.write("</div>");
    doc.write("</body></html>");
    doc.close();
}

// SCRIPT DA PAGINA ACABAMENTOS
var tabAcab = [
    ["", "", "vazio_150", ""],
    ["Ilumi/Stylus", "Placa 4x4", "Stylus2tomadas", 4],
    ["Ilumi/Stylus", "Tomada", "stylusTomada", 6],
    ["Ilumi/Stylus", "Interruptor", "stylusInterruptor", 6],
    ["Ilumi/Slim", "Placa 4x2", "SlimPlaca4x2", 4],
    ["Ilumi/Slim", "Módulo Tomada", "SlimModuloTomada", 5],
    ["Ilumi/Slim", "Módulo Interruptor", "SlimModuloInterruptor", 4],
]

function ShowAcab(ind) {
    var titu = document.getElementById("NomeDes");
    var foto = document.getElementById("ImgDes");
    var prec = document.getElementById("PrcDes");
    titu.innerHTML = "<h2>"
        + tabAcab[ind][0]
        + "</h2>";
    titu.innerHTML = "<h2>"
        + tabAcab[ind][0]
        + "</h2>"
        + tabAcab[ind][1]
    foto.src = "../Imagens/" + tabAcab[ind][2]
        + ".png"; prec.innerHTML = "</p><p>Preço: R$ "
            + "<span class='preco'>"
            + tabAcab[ind][3]
            + ",00</span></p>";
}

// SCRIPT DA PAGINA PEDIDOS
function VerificaTelefone(campo, tam) {
    var i, c;
    var strTel = campo.value;

    if (strTel.length != tam) {
        alert(campo.name
            + " tem de ter " +
            tam + " dígitos!");
        return false;
    }
    for (i = 0; i < tam; i++) {
        c = strTel.charAt(i);
        if ((c < '0') || (c > '9')) {
            alert(campo.name + " só pode ter" +
                " dígitos, caracter " +
                c + " inválido!");

            return false;
        }
    }
    return true;
}

function calcular(num) {
    var resto = 0, soma = 0;
    for (i = 2; i < 11; i++) {
        soma = soma + ((num % 10) * i);
        num = parseInt(num / 10);
    }
    resto = (soma % 11);
    return (resto > 1) ? (11 - resto) : 0;
}

function VerificaCPF(campo) {
    var i, c, cpf;
    var iniCPF;
    var strCPF = campo.value;
    if (strCPF.length != 11) {
        alert("CPF tem de ter 11 dígitos!");
        return false;
    }
    for (i = 0; i < 11; i++) {
        c = strCPF.charAt(i);
        if ((c < '0') || (c > '9')) {
            alert('Insira apenas os dígitos, caracter "' +
                c + '" inválido!');
            return false;
        }
    }
    iniCPF = strCPF.substring(0, 9);
    pd = calcular(iniCPF);
    sd = calcular(iniCPF * 10 + pd);
    if ((pd != strCPF.charAt(9)) || (sd != strCPF.charAt(10))) {
        alert("Dígitos verificadores inválidos!");
        return false;
    }
    return true;
}

var tabPrcProd = [0, 4, 6, 6, 4, 5, 4, 200, 190, 150, 30, 20, 50, 100];

function IncluiLista(sel) {
    var prod = sel.selectedIndex;

    if (prod === 0) {
        alert("Nenhum produto selecionado!");
        return;
    }

    var prc = tabPrcProd[prod];
    sel.selectedIndex = 0;

    var form = sel.form;
    var listaPedidos = form.querySelector('[name="listaPedidos"]');
    var TxtTotal = form.querySelector('[name="TxtTotal"]');

    listaPedidos.value += sel.options[prod].text + '\n';
    TxtTotal.value = parseInt(TxtTotal.value || "0") + prc;
}