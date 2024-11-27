$(document).ready(function () {

    // Um produto não pode ficar sem preço e/ou nome abaixo (não irá mostrar na lista de produtos)
    const produtos = [
        "Refrigerante de Cola 2L",
        "Refrigerante de Guaraná 2L",
        "Salgadinho de Batata 115g",
        "Leite Integral 1L",
        "Arroz Branco 1kg",
        "Feijão Preto 1kg",
        "Macarrão Espaguete 500g",
        "Açúcar Refinado 1kg",
        "Café Torrado e Moído 500g",
        "Óleo de Soja 900ml"
    ];

    const precos = [
        7.50,
        6.80,
        7.99,
        4.20,
        5.30,
        7.45,
        3.60,
        2.80,
        12.90,
        6.99
    ];

    // Insira os endereços das imagens que deseja usar aqui, condizendo com o número de produtos (OPCIONAL)
    const imagens = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    // Valor total, alterado dinamicamente
    let soma = 0;

    // Adiciona os produtos de forma dinâmica no grid (lista de produtos), e checa se o preço não está definido e se o nome é maior ou igual a 1 caractere
    for (let i = 0; i < produtos.length && i < precos.length; i++) {
        if (precos[i] !== undefined && produtos[i].length >= 1) {
            $('#lista-produtos').append('<div class="lista-produtos-item"> <img src="' + imagens[i] + '" width="30px"> <h4 class="produto-nome" data-index="' + i + '">' + produtos[i] + '</h4> Preço: <span class="precos">R$' + precos[i].toFixed(2) + '</span> <br><br> <input type="text" class="quantidade" data-index="' + i + '" placeholder="Quantidade"> <button class="botao-quantidade" data-index="' + i + '">Adicionar</button> </div>');
        }
    }

    // Ao clicar no nome do produto, adiciona ele ao flexbox (comanda) e soma seu preço no total
    $('#lista-produtos').on('click', '.produto-nome', function () {
        const i = $(this).data('index');
        soma = soma + parseFloat(precos[i]);
        $('#comanda').append('<div class="comanda-item"> <h4>'+ produtos[i] +'</h4> Preço: <span class="precos">R$' + precos[i].toFixed(2) + '</span> <br><br> <button class="botao-remover" data-preco="' + precos[i] + '">Remover</button> </div>');
        $('#total').html('Total: <span class="precos">R$' + soma.toFixed(2) + '</span>');
    });

    // Adicionar produtos por quantidade
    $('#lista-produtos').on('click', '.botao-quantidade', function () {
        const i = $(this).data('index');
        let quantidade = parseInt($('.quantidade[data-index="' + i + '"]').val());

        if (isNaN(quantidade) || quantidade <= 0) {
            alert('Por favor, insira uma quantidade válida.');
        }

        for (let q = 0; q < quantidade; q++) {
            $('#comanda').append('<div class="comanda-item"> <h4>' + produtos[i] + '</h4> Preço: <span class="precos">R$' + precos[i].toFixed(2) + '</span> <br><br> <button class="botao-remover" data-preco="' + precos[i] + '">Remover</button> </div>');
            soma += parseFloat(precos[i]);
        }
        $('#total').html('Total: <span class="precos">R$' + soma.toFixed(2) + '</span>');
    });

    // Remove o produto da comanda e subtrai o valor do total
    $('#comanda').on('click', '.botao-remover', function () {
        let precoItem = parseFloat($(this).data('preco'));
        $(this).closest('.comanda-item').remove();
        soma = soma - precoItem;
        $('#total').html('Total: <span class="precos">R$' + soma.toFixed(2) + '</span>');
    });

    // Limpa a comanda e zera o total
    $('#botao-limpar').click(function () {
        $('.comanda-item').remove();
        soma = 0;
        $('#total').html('Total: <span class="precos">R$' + soma.toFixed(2) + '</span>');
    });

    // Finaliza a compra e imprime a comanda (a função de imprimir não está funcionando corretamente, então está comentada)
    $('#botao-imprimir-comanda').click(function () {
        alert('Compra finalizada com sucesso!');
        $('.comanda-item').remove();
        soma = 0;
        $('#total').html('Total: <span class="precos">R$' + soma.toFixed(2) + '</span>');
        // window.print();
    });

    // Coloca a página em tela cheia
    $('#botao-telacheia').on('click', function (){
        let telacheia = document.getElementById('pagina');
        if(document.fullscreenElement == null){
            telacheia.requestFullscreen();
            $('#botao-telacheia').text('Sair da tela cheia');
        } else {
            document.exitFullscreen();
            $('#botao-telacheia').text('Tela cheia');
        }
    });
});