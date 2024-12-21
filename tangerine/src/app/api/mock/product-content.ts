export interface Content {
    id: string
    title: string;
    desciption: string;
    details: string[];
}
export interface Vantage {
    id: string
    title: string;
    icon: string,
    description: string; 
    details: string[];
}


export const Contents: Content[] = [
    {
        id: '',
        title: '01 - Introdução e Apresentação',
        desciption: 'Introdução e Apresentação',
        details: [
            'Aula 1 - Introdução ao Curso',
            'Aula 2 - Como funciona a Plataforma e o Certificado',
            'Aula 3 - Material de Apoio (E-book)'
        ]
    },
    {
        id: '',
        title: '02 - Download e Metodologia',
        desciption: 'Download e Metodologia',
        details: [
            'Aula 4 - Download e Instalação do Power BI',
            'Aula 5 - Utilização do Power BI'
        ]
    },
    {
        id: '',
        title: '03 - Primeiros Passos e Importação de Dados',
        desciption: 'Download e Metodologia',
        details: [
            'Aula 6 - Apresentação geral do layout',
            'Aula 7 - Importando Dados e Tratando no Power Query',
            'Aula 8 - Transformando dados e Fonte do arquivo'
        ]
    },
    {
        id: '',
        title: '04 - Trabalhando com Datas',
        desciption: 'Trabalhando com datas',
        details: [
            'Aula 9 - Colunas de Datas',
            'Aula 10 - Tabela Calendário'
        ]
    },
    {
        id: '',
        title: '05 - Relacionamentos no Power BI',
        desciption: 'Relacionamentos no Power BI',
        details: [
            'Aula 11 - Tabela Fato x Tabela Dimensão',
            'Aula 12 - Criando Relacionamentos'
        ]
    },
    {
        id: '',
        title: '06 - Primeiro Dashboard, Medidas e Temas',
        desciption: 'Primeiro Dashboard, Medidas e Temas',
        details: [
            'Aula 13 - Novas colunas e Medidas',
            'Aula 14 - Dashboard Simples',
            'Aula 15 - Temas e Paleta de Cores'
        ]
    },
    {
        id: '',
        title: '07 - Conta, Dashboard Online e no Celular',
        desciption: 'Conta, Dashboard Online e no Celular',
        details: [
            'Aula 16 - Criando Conta Corporativa',
            'Aula 17 - Publicando o seu Dashboard Online',
            'Aula 18 - Exibição e Layout Móvel'
        ]
    },
    {
        id: '',
        title: '08 - Fórmulas DAX',
        desciption: 'Fórmulas DAX',
        details: [
            'Aula 19 - Multiplicação, Soma e IF (SE)',
            'Aula 21 - Dashboard RH/Funcionários (Parte 1)',
            'Aula 22 - Dashboard RH/Funcionários (Parte 2)'
        ]
    },
    {
        id: '',
        title: '09 - Dashboard de Vendas e Devoluções',
        desciption: 'Dashboard de Vendas e Devoluções',
        details: [
            'Aula 23 - Importando e Tratando dados',
            'Aula 24 - Gráficos com Drill Through e Drill Down',
            'Aula 25 - Gráfico de Funil e Ícones'
        ]
    },
    {
        id: '',
        title: '10 - Dashboard de Metas e Resultados',
        desciption: 'Dashboard de Metas e Resultados',
        details: [
            'Aula 26 - Importando e Tratando dados',
            'Aula 27 - Gráficos (Colunas, Dispersão, Matriz, Cartão)',
            'Aula 28 - KPI e Indicador',
            'Aula 29 - Formato e Design do Dashboard',
            'Aula 30 - Interação com Botões (Claro e Escuro)'
        ]
    },
    {
        id: '',
        title: '11 - Base de Dados e Template',
        desciption: 'Base de Dados e Template',
        details: [
            'Aula 31 - Planilha Geradora de Base de Dados',
            'Aula 32 - Dicas para criar uma base de dados manual',
            'Aula 33 - Chat GPT (Inteligência Artificial)',
            'Aula 34 - Site de Templates e Plano de Fundo no Power Point',
        ]
    },
    {
        id: '',
        title: '12 - Certificado de Conclusão',
        desciption: 'Certificado de Conclusão',
        details: [
            'Considerações Finais e Certificado',
        ]
    },
    {
        id: '',
        title: '13 - Acesso vitalício a todos os Cursos e Produtos da Expert Cursos',
        desciption: 'Material',
        details: [
            'Passos para liberação de todos os produtos',
        ]
    } 
];

export const Vantage: Vantage[] = [
    {
        id: '',
        icon: 'check',
        title: '100% Online',
        description: 'Aulas totalmente online para você aprender de qualquer lugar.',
        details: [
            'Flexibilidade para estudar no seu ritmo.',
            'Acesse o conteúdo de qualquer dispositivo conectado à internet.'
        ]
    },
    {
        id: '',
        icon: 'check',
        title: 'Acesso vitalício',
        description: 'Acesso ilimitado ao conteúdo do curso após a compra.',
        details: [
            'Revise o conteúdo quantas vezes precisar.',
            'Sem prazos para finalizar o curso.'
        ]
    },
    {
        id: '',
        icon: 'check',
        title: 'Conteúdo filtrado com videoaulas diretas de no máximo 20 minutos',
        description: 'Videoaulas curtas e objetivas para facilitar o aprendizado.',
        details: [
            'Aulas projetadas para serem diretas ao ponto.',
            'Facilidade de encaixar o estudo na sua rotina diária.'
        ]
    },
    {
        id: '',
        icon: 'check',
        title: 'Suporte exclusivo',
        description: 'Tenha acesso a suporte especializado durante seus estudos.',
        details: [
            'Tire dúvidas diretamente com os instrutores.',
            'Receba orientação e feedback personalizado.'
        ]
    },
    {
        id: '',
        icon: 'check',
        title: 'Preço acessível',
        description: 'Cursos de alta qualidade por um preço que cabe no seu bolso.',
        details: [
            'Excelente custo-benefício.',
            'Investimento acessível para todos.'
        ]
    }
];
