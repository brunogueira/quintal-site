// Tema claro/escuro (mesma chave da página inicial) e sumário das páginas de texto.
// Carregue no <head>, sem defer, para o tema salvo valer antes da primeira pintura.
(function () {
  var r = document.documentElement;
  r.classList.add('js');
  try {
    var t = localStorage.getItem('tema');
    if (t === 'light' || t === 'dark') r.dataset.theme = t;
  } catch (e) {}

  document.addEventListener('DOMContentLoaded', function () {
    var botao = document.querySelector('.tema');
    if (botao) botao.addEventListener('click', function () {
      var escuro = r.dataset.theme ? r.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
      r.dataset.theme = escuro ? 'light' : 'dark';
      try { localStorage.setItem('tema', r.dataset.theme); } catch (e) {}
    });

    // Sumário montado com os próprios títulos da página: nada a manter à mão.
    var lugar = document.querySelector('.sumario');
    if (!lugar) return;
    var caixa = document.createElement('details');
    var titulo = document.createElement('summary');
    var nav = document.createElement('nav');
    titulo.textContent = 'Nesta página';
    nav.setAttribute('aria-label', 'Nesta página');
    document.querySelectorAll('main h2[id]').forEach(function (h) {
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      nav.appendChild(a);
    });
    caixa.append(titulo, nav);
    lugar.appendChild(caixa);
    var largo = matchMedia('(min-width: 1080px)');
    function ajusta() { caixa.open = largo.matches; }
    ajusta();
    largo.addEventListener('change', ajusta);
    nav.addEventListener('click', function (e) { if (!largo.matches && e.target.closest('a')) caixa.open = false; });
  });
})();
