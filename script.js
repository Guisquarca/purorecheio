// Dados dos serviços
const servicos = {
    'gestao-tributaria': {
        titulo: 'Gestão Tributária',
        descricao: `Navegar pelo complexo sistema tributário brasileiro pode ser um desafio enorme para qualquer negócio. Com a nossa Gestão Tributária, você garante que sua empresa esteja sempre em conformidade com as leis, evita multas desnecessárias e, o mais importante, otimiza sua carga tributária de forma legal. Analisamos detalhadamente suas operações para identificar as melhores estratégias fiscais, garantindo que você pague apenas o que é devido e possa focar no crescimento do seu negócio com tranquilidade e segurança jurídica.`
    },
    'abertura-empresa': {
        titulo: 'Abertura e Encerramento de Empresa (Gratuita para MEIs)',
        descricao: `Sonha em ter seu próprio negócio ou precisa regularizar sua situação? Nós cuidamos de toda a burocracia para você! Oferecemos suporte completo para a abertura da sua empresa, desde a escolha do regime tributário mais adequado até o registro nos órgãos competentes. E se for hora de seguir um novo caminho, também auxiliamos no processo de encerramento, garantindo que tudo seja feito de forma correta e sem pendências. Para os Microempreendedores Individuais (MEIs), esse serviço é ainda mais especial: realizamos todo o processo de abertura ou encerramento da sua empresa de forma gratuita, apoiando o empreendedorismo com total dedicação.`
    },
    'redes-sociais': {
        titulo: 'Gestão de Redes Sociais',
        descricao: `No mundo digital de hoje, ter uma presença forte nas redes sociais é fundamental para o sucesso. Com a nossa Gestão de Redes Sociais, sua marca não apenas estará presente, mas será notada e lembrada! Desenvolvemos estratégias de conteúdo personalizadas, criamos posts engajadores, gerenciamos suas campanhas e monitoramos o desempenho para garantir que sua mensagem alcance o público certo. Deixe sua comunicação digital nas mãos de especialistas e veja seu engajamento e sua base de clientes crescerem exponencialmente.`
    },
    'insights': {
        titulo: 'Insights para Potencializar seu Negócio',
        descricao: `Você quer mais do que apenas sobreviver; quer prosperar e se destacar no mercado? Nossos Insights para Potencializar seu Negócio são a chave para isso. Através de análises aprofundadas do seu mercado, concorrência e operações internas, identificamos oportunidades únicas de crescimento, pontos de melhoria e estratégias inovadoras. Receba recomendações acionáveis e personalizadas que farão seu negócio ir além, otimizando processos, atraindo mais clientes e aumentando sua lucratividade de forma sustentável.`
    },
    'recursos-humanos': {
        titulo: 'Gestão de Recursos Humanos (para Pessoas Físicas e Pessoas Jurídicas)',
        descricao: `Cuidar das pessoas é cuidar do seu maior ativo, seja você um empregador individual ou uma grande empresa. Nossa Gestão de Recursos Humanos oferece soluções completas para pessoas físicas (como contratação de funcionários domésticos) e pessoas jurídicas. Cobrimos desde a seleção e contratação, passando pela folha de pagamento, gestão de benefícios, conformidade trabalhista, até o desenvolvimento e engajamento dos colaboradores. Tenha a certeza de que suas obrigações trabalhistas estão em dia e que seus funcionários estão motivados e produtivos.`
    },
    'aconselhamento-juridico': {
        titulo: 'Aconselhamento Jurídico',
        descricao: `Questões legais podem surgir a qualquer momento e ter o suporte certo faz toda a diferença. Nosso Aconselhamento Jurídico oferece orientação especializada para você ou sua empresa. Seja para a elaboração de contratos, solução de conflitos, questões trabalhistas, societárias ou outras demandas legais, fornecemos clareza e segurança nas suas decisões. Conte com um time experiente para proteger seus interesses e garantir que você esteja sempre bem informado e amparado legalmente.`
    }
};

// Sistema de hexágonos otimizado
let hexagons = [];
let litHexagons = [];
let animationId = null;
let lastAnimationTime = 0;

// Função para criar hexágonos (otimizada)
function createHexagons() {
    const background = document.getElementById('hexagonBackground');
    const hexagonSize = 80; // Aumentado para reduzir quantidade
    const hexagonHeight = 69;
    
    // Calcular quantidade baseada no tamanho da tela
    const rows = Math.ceil(window.innerHeight / hexagonHeight) + 1;
    const cols = Math.ceil(window.innerWidth / hexagonSize) + 1;
    
    // Limitar quantidade máxima de hexágonos
    const maxHexagons = Math.min(rows * cols, 150); // Máximo 150 hexágonos
    
    let hexagonCount = 0;
    
    for (let row = 0; row < rows && hexagonCount < maxHexagons; row++) {
        for (let col = 0; col < cols && hexagonCount < maxHexagons; col++) {
            const hexagon = document.createElement('div');
            hexagon.className = 'hexagon';
            
            // Posicionamento em padrão de favo de mel
            const x = col * hexagonSize + (row % 2) * (hexagonSize / 2);
            const y = row * (hexagonHeight * 0.75);
            
            hexagon.style.left = x + 'px';
            hexagon.style.top = y + 'px';
            
            background.appendChild(hexagon);
            hexagons.push(hexagon);
            hexagonCount++;
        }
    }
}

// Função para iluminar hexágonos (otimizada)
function lightRandomHexagons() {
    // Apagar todos os hexágonos acesos
    litHexagons.forEach(hex => {
        hex.classList.remove('lit');
    });
    litHexagons = [];
    
    // Escolher 5 hexágonos aleatórios para iluminar (reduzido de 7 para 5)
    const availableHexagons = [...hexagons];
    const hexagonsToLight = Math.min(5, availableHexagons.length);
    
    for (let i = 0; i < hexagonsToLight; i++) {
        const randomIndex = Math.floor(Math.random() * availableHexagons.length);
        const hexagon = availableHexagons.splice(randomIndex, 1)[0];
        
        hexagon.classList.add('lit');
        litHexagons.push(hexagon);
    }
}

// Função de animação otimizada usando requestAnimationFrame
function animateHexagons(timestamp) {
    if (timestamp - lastAnimationTime > 4000) { // 4 segundos entre mudanças
        lightRandomHexagons();
        lastAnimationTime = timestamp;
    }
    
    animationId = requestAnimationFrame(animateHexagons);
}

// Função para inicializar o site
function initSite() {
    // Criar hexágonos
    createHexagons();
    
    // Iniciar sistema de iluminação otimizado
    lastAnimationTime = performance.now();
    animationId = requestAnimationFrame(animateHexagons);
    
    // Mostrar tela de carregamento por 8 segundos
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        
        // Adicionar animação de entrada
        const mainContent = document.getElementById('main-content');
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            mainContent.style.transition = 'all 1s ease';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }, 8000);
}

// Função para abrir modal (responsivo)
function openModal(serviceId) {
    const modal = document.getElementById('service-modal');
    const modalContent = document.getElementById('modal-content');
    const service = servicos[serviceId];
    
    modalContent.innerHTML = `
        <h2>${service.titulo}</h2>
        <p>${service.descricao}</p>
    `;
    
    modal.style.display = 'block';
    
    // Posicionar modal responsivamente baseado na posição do scroll
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const modalHeight = 600; // Altura aproximada do modal
    
    // Calcular posição ideal para o modal
    let modalTop;
    if (scrollY + windowHeight < modalHeight) {
        // Se não há espaço suficiente abaixo, posicionar no topo
        modalTop = '5%';
    } else if (scrollY + windowHeight - modalHeight < 100) {
        // Se está próximo do final da página, posicionar um pouco acima
        modalTop = '10%';
    } else {
        // Posicionar próximo à posição atual do scroll
        modalTop = Math.max(5, (scrollY / (document.body.scrollHeight - windowHeight)) * 20) + '%';
    }
    
    // Aplicar posição
    const modalElement = modal.querySelector('.modal-content');
    modalElement.style.marginTop = modalTop;
    
    // Adicionar animação de entrada
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.transition = 'opacity 0.3s ease';
        modal.style.opacity = '1';
    }, 10);
}

// Função para fechar modal
function closeModal() {
    const modal = document.getElementById('service-modal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Função para abrir WhatsApp
function openWhatsApp() {
    const phoneNumber = '11946162314';
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da MDG Assessoria Empresarial.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Função para redimensionar hexágonos (otimizada)
function resizeHexagons() {
    // Cancelar animação atual
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    const background = document.getElementById('hexagonBackground');
    background.innerHTML = '';
    hexagons = [];
    litHexagons = [];
    createHexagons();
    
    // Reiniciar animação
    lastAnimationTime = performance.now();
    animationId = requestAnimationFrame(animateHexagons);
}

// Debounce function para otimizar redimensionamento
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o site
    initSite();
    
    // Adicionar event listeners para os botões "SAIBA MAIS"
    const saibaMaisBtns = document.querySelectorAll('.saiba-mais-btn');
    saibaMaisBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const serviceCard = this.closest('.service-card');
            const serviceId = serviceCard.getAttribute('data-service');
            openModal(serviceId);
        });
    });
    
    // Adicionar event listener para fechar modal
    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeModal);
    
    // Fechar modal ao clicar fora dele
    const modal = document.getElementById('service-modal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Adicionar efeitos de hover nos cards (otimizado)
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Redimensionar hexágonos quando a janela for redimensionada (com debounce)
    const debouncedResize = debounce(resizeHexagons, 250);
    window.addEventListener('resize', debouncedResize);
});

// Adicionar efeito de parallax suave no scroll (otimizado)
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.logo');
            const speed = scrolled * 0.5;
            
            if (parallax) {
                parallax.style.transform = `translateY(${speed}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Adicionar animação de entrada para os cards
function animateCards() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

// Chamar animação dos cards após o carregamento
setTimeout(animateCards, 8500);

// Cleanup quando a página for fechada
window.addEventListener('beforeunload', function() {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}); 