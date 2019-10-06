$(function() {

    toastr.options= {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "500",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

});

/* /////////////////////////////
 * SISTEMA JS ( BOTÃO - CLICK )
 //////////////////////////// */
 function goTo(str, boolean) {
    if(boolean) {
        return window.open(str, "_blank");
    }
    window.location.href = str;
}



/* ---------
   CLASSES
--------- */
    // - principal
    var dAuto       = document.querySelector('.perfil');
    // - avatar
    var dAvatar     = document.querySelector('.perfil .avatar');
    // - conteudo
    var dConteudo   = document.querySelector('.perfil .conteudo');
    // - rodape
    var dRodape     = document.querySelector('.perfil .rodape');

    // - formulário - botão
    var kFormBotao = document.querySelector('.form button');
    // - formulário - input
    var kFormInput = document.querySelector('.form input');



/* ---------
  EXECUÇÃO
--------- */
function gitHub(usuario) {

    axios.get('https://api.github.com/users/' + usuario)
        .then(function(response){

            if (response.data.name != null) {
            function redenrizar() {

                toastr["success"]('O usuário <strong>' + response.data.name + '</strong> foi encontrado! Listando informações...', 'SUCESSO');

                // - limpar tudo
                dConteudo.innerHTML = '';
                dAvatar.innerHTML = '';

                // - perfil + hr
                var lHR = document.createElement('hr');

                // - perfil + avatar
                var aPerfilImg = document.createElement('img');
                aPerfilImg.setAttribute('src', response.data.avatar_url);

                // - perfil + nome
                var cNome = document.createElement('span');
                cNome.classList.add('nome');
                var aPerfilNome = document.createTextNode(response.data.name);

                // - perfil + bio
                var cBio = document.createElement('span');
                cBio.classList.add('bio');
                var aPerfilBio = document.createTextNode(response.data.bio);

                // - perfil + seguidores
                var cSeguidores = document.createElement('em');
                cSeguidores.classList.add('seguidores');
                var aPerfilSeguidores = document.createTextNode('Seguidores: ' + response.data.followers);

                // - perfil + repositorios
                var cRepositorios = document.createElement('em');
                cRepositorios.classList.add('repositorios');
                var aPerfilRepositorios = document.createTextNode('Repositórios Públicos: ' + response.data.public_repos);

                // - perfil + link
                var cPerfil = document.createElement('button');
                var kPerfil = cPerfil.setAttribute('onclick', 'window.open("'+response.data.html_url+'")')
                var aPerfil = document.createTextNode('acessar github');

                dAuto.classList.add('visivel');

                // AVATAR
                dAvatar.appendChild(aPerfilImg);

                // CONTEUDO
                    // - nome
                    dConteudo.appendChild(cNome);
                    cNome.appendChild(aPerfilNome);

                    // - bio
                    dConteudo.appendChild(cBio);
                    cBio.appendChild(aPerfilBio);

                    // - hr
                    dConteudo.appendChild(lHR);

                    // - seguidores
                    dConteudo.appendChild(cSeguidores);
                    cSeguidores.appendChild(aPerfilSeguidores);

                    // - repositorios
                    dConteudo.appendChild(cRepositorios);
                    cRepositorios.appendChild(aPerfilRepositorios);

                // RODAPE
                    // - perfil
                    dRodape.appendChild(cPerfil);
                    cPerfil.appendChild(aPerfil);
            }

            setTimeout(function() {
                return redenrizar();
            }, 1800);

            } else {
                toastr["error"]('Descupe, mas nenhum dado foi encontrado para este usuário', 'ERRO');
            }
        })
        .catch(function(error) {
            toastr["error"]('Insira um usuário válido', 'ERRO');
        });
}



/* ------------------------- 
  PREPARAÇÃO PARA EXECUTAR
------------------------- */
    // - PPE + função
    function usuario() {
        var usuario = kFormInput.value;

        if (usuario.length > 3) {
            kFormInput.value = '';
            gitHub(usuario);
            
            toastr["info"]('Procurando...', 'INFORMAÇÃO');
        } else {
            toastr["error"]('Digite um usuário com mais de 3 caracteres', 'ERRO');
        }
    }
    // - PPE + botão
    kFormBotao.onclick = usuario;