/* Vocabulário e frases originais escritos para o Voca Sprint.
 * A ordem dos conjuntos é estável: eles são acrescentados depois das dez trilhas existentes.
 * words contém as formas de resposta; glosses registra o sentido treinado em cada tema.
 * phrases contém [frase em inglês, significado em português, alternativas aceitas opcionais].
 */
(() => {
  'use strict';
  const tracks = [
    {
      title: 'Comida e bebida', icon: '🍎', description: 'Palavras para refeições e bebidas do dia a dia.',
      entries: [
        ['water','água'],['bread','pão'],['rice','arroz'],['beans','feijão'],['egg','ovo'],['milk','leite'],['cheese','queijo'],['butter','manteiga'],['coffee','café'],['tea','chá'],
        ['juice','suco'],['fruit','fruta'],['apple','maçã'],['banana','banana'],['orange','laranja (fruta)'],['vegetable','legume ou verdura'],['tomato','tomate'],['potato','batata'],['onion','cebola'],['carrot','cenoura'],
        ['meat','carne'],['chicken','frango (carne)'],['fish','peixe'],['salad','salada'],['soup','sopa'],['sugar','açúcar'],['salt','sal'],['pepper','pimenta'],['fresh','fresco ou fresca'],['breakfast','café da manhã'],
        ['lunch','almoço'],['dinner','jantar'],['hot','quente (temperatura)'],['plate','prato'],['cup','xícara'],['spoon','colher'],['fork','garfo'],['knife','faca'],['hungry','com fome'],['thirsty','com sede']
      ],
      phrases: [
        ['I drink water.','Eu bebo água.'],['The bread is fresh.','O pão está fresco.'],['We eat rice and beans.','Nós comemos arroz e feijão.',['We eat beans and rice.']],['She drinks milk.','Ela bebe leite.'],['I eat an apple.','Eu como uma maçã.'],
        ['The soup is hot.','A sopa está quente.'],['I need salt.','Eu preciso de sal.',['I need some salt.']],['I have a cup of tea.','Eu tenho uma xícara de chá.',["I've got a cup of tea."]],['We eat dinner together.','Nós jantamos juntos.',['We have dinner together.']],['I am hungry.','Eu estou com fome.',["I'm hungry."]]
      ]
    },
    {
      title: 'Em casa', icon: '🏠', description: 'Explore os cômodos, objetos e tarefas da casa.',
      wordAliases: { apartment:['flat'], sofa:['couch'], fridge:['refrigerator'], closet:['wardrobe'] },
      entries: [
        ['house','casa (edificação)'],['home','lar'],['room','cômodo'],['bedroom','quarto de dormir'],['bathroom','banheiro'],['kitchen','cozinha'],['apartment','apartamento'],['door','porta'],['window','janela'],['wall','parede'],
        ['floor','chão ou piso'],['ceiling','teto'],['roof','telhado'],['key','chave'],['bed','cama'],['pillow','travesseiro'],['blanket','cobertor'],['sheet','lençol'],['sofa','sofá'],['chair','cadeira'],
        ['table','mesa'],['lamp','abajur ou luminária'],['light','luz'],['mirror','espelho'],['shelf','prateleira'],['drawer','gaveta'],['closet','armário'],['fridge','geladeira'],['stove','fogão'],['oven','forno'],
        ['sink','pia'],['shower','chuveiro'],['towel','toalha'],['soap','sabão ou sabonete'],['broom','vassoura'],['basket','cesta'],['garden','jardim'],['clean','limpar'],['wash','lavar'],['lock','trancar']
      ],
      phrases: [
        ['The door is open.','A porta está aberta.',["The door's open."]],['My keys are on the table.','Minhas chaves estão sobre a mesa.'],['The bedroom is clean.','O quarto está limpo.',['The room is clean.']],['The towel is in the bathroom.','A toalha está no banheiro.'],['She washes the floor.','Ela lava o chão.'],
        ['The milk is in the fridge.','O leite está na geladeira.',['The milk is in the refrigerator.']],['The lamp is on the table.','O abajur está sobre a mesa.'],['The bed is in the room.','A cama está no quarto.'],['Please lock the door.','Por favor, tranque a porta.',['Lock the door, please.']],['The garden is small.','O jardim é pequeno.']
      ]
    },
    {
      title: 'Pessoas e família', icon: '👪', description: 'Apresente pessoas e fale sobre seus relacionamentos.',
      wordAliases: { mother:['mom','mum'], father:['dad'], grandmother:['grandma'], grandfather:['grandpa'], neighbor:['neighbour'] },
      entries: [
        ['mother','mãe'],['father','pai'],['parent','pai ou mãe'],['sister','irmã'],['brother','irmão'],['daughter','filha'],['son','filho'],['child','criança'],['baby','bebê'],['grandmother','avó'],
        ['grandfather','avô'],['aunt','tia'],['uncle','tio'],['cousin','primo ou prima'],['nephew','sobrinho'],['niece','sobrinha'],['family','família'],['friend','amigo ou amiga'],['neighbor','vizinho ou vizinha'],['partner','parceiro ou parceira'],
        ['husband','marido'],['wife','esposa'],['wedding','cerimônia de casamento'],['couple','casal'],['guest','convidado ou convidada'],['person','pessoa'],['people','pessoas'],['name','nome'],['age','idade'],['birthday','aniversário'],
        ['welcome','bem-vindo ou bem-vinda'],['meet','conhecer ou encontrar'],['visit','visitar'],['help','ajudar'],['share','compartilhar'],['talk','conversar'],['listen','escutar'],['hug','abraçar'],['together','juntos ou juntas'],['kind','gentil']
      ],
      phrases: [
        ['My mother is kind.','Minha mãe é gentil.',['My mom is kind.','My mum is kind.']],['My brother is at home.','Meu irmão está em casa.'],['Her sister is my friend.','A irmã dela é minha amiga.'],['We visit our family.','Nós visitamos nossa família.'],['The baby is at home.','O bebê está em casa.'],
        ['My cousin lives here.','Meu primo mora aqui.'],['They are good friends.','Eles são bons amigos.'],['Today is my birthday.','Hoje é meu aniversário.',["It's my birthday today.",'It is my birthday today.']],['Can you help my father?','Você pode ajudar meu pai?',['Can you help my dad?']],['We eat together.','Nós comemos juntos.']
      ]
    },
    {
      title: 'Pela cidade', icon: '🗺️', description: 'Encontre lugares e compreenda direções.',
      wordAliases: { cafe:['coffee shop'] },
      entries: [
        ['street','rua'],['road','estrada'],['avenue','avenida'],['corner','esquina'],['block','quarteirão'],['traffic','trânsito'],['bridge','ponte'],['park','parque'],['square','praça'],['building','prédio'],
        ['bank','banco (instituição financeira)'],['museum','museu'],['library','biblioteca'],['hospital','hospital'],['pharmacy','farmácia'],['supermarket','supermercado'],['bakery','padaria'],['restaurant','restaurante'],['cafe','cafeteria'],['station','estação'],
        ['airport','aeroporto'],['hotel','hotel'],['school','escola'],['office','escritório'],['church','igreja'],['map','mapa'],['address','endereço'],['direction','direção'],['north','norte'],['south','sul'],
        ['east','leste'],['west','oeste'],['left','esquerda (direção)'],['right','direita (direção)'],['near','perto de'],['far','longe'],['across','do outro lado de'],['behind','atrás de'],['between','entre'],['straight','em frente']
      ],
      phrases: [
        ['The bank is near the park.','O banco fica perto do parque.',['The bank is close to the park.']],['The museum is on this street.','O museu fica nesta rua.'],['The pharmacy is next to the hospital.','A farmácia fica ao lado do hospital.'],['Turn left at the corner.','Vire à esquerda na esquina.'],['Go straight.','Siga em frente.',['Go straight ahead.']],
        ['The hotel is behind the station.','O hotel fica atrás da estação.'],['The bakery is across the street.','A padaria fica do outro lado da rua.',['The bakery is on the other side of the street.']],['The school is near the library.','A escola fica perto da biblioteca.'],['What is your address?','Qual é o seu endereço?', ["What's your address?"]],['The restaurant is between the bank and the hotel.','O restaurante fica entre o banco e o hotel.']
      ]
    },
    {
      title: 'Viagem e transporte', icon: '✈️', description: 'Prepare uma viagem e converse durante o trajeto.',
      wordAliases: { taxi:['cab'], subway:['metro','underground'], bicycle:['bike'], plane:['airplane','aeroplane'], luggage:['baggage'] },
      entries: [
        ['ticket','passagem ou bilhete'],['passport','passaporte'],['luggage','bagagem'],['suitcase','mala'],['bag','bolsa ou sacola'],['train','trem'],['bus','ônibus'],['car','carro'],['taxi','táxi'],['subway','metrô'],
        ['plane','avião'],['bicycle','bicicleta'],['motorcycle','motocicleta'],['boat','barco'],['ship','navio'],['flight','voo'],['journey','jornada ou trajeto'],['trip','viagem'],['travel','viajar'],['platform','plataforma'],
        ['seat','assento'],['driver','motorista'],['passenger','passageiro ou passageira'],['stop','parada'],['depart','partir'],['arrive','chegar'],['leave','sair ou partir'],['return','voltar'],['book','reservar'],['reservation','reserva'],
        ['entrance','entrada'],['exit','saída'],['gate','portão de embarque'],['route','rota'],['delay','atraso'],['schedule','horário programado'],['destination','destino'],['tourist','turista'],['vehicle','veículo'],['heavy','pesado ou pesada']
      ],
      phrases: [
        ['I have my passport.','Eu tenho meu passaporte.',["I've got my passport."]],['Where is my ticket?','Onde está minha passagem?', ["Where's my ticket?"]],['The bus is late.','O ônibus está atrasado.'],['We travel by train.','Nós viajamos de trem.'],['The plane is at the airport.','O avião está no aeroporto.'],
        ['My suitcase is heavy.','Minha mala está pesada.'],['The driver is here.','O motorista está aqui.'],['The train leaves at six.','O trem parte às seis.'],['We have a reservation.','Nós temos uma reserva.',['We have a booking.']],['Where is the exit?','Onde fica a saída?', ["Where's the exit?"]]
      ]
    },
    {
      title: 'Trabalho e escritório', icon: '💼', description: 'Converse sobre tarefas, equipe e rotina de trabalho.',
      wordAliases: { colleague:['coworker','co-worker'], email:['e-mail'], answer:['response'] },
      entries: [
        ['work','trabalhar'],['job','emprego'],['company','empresa'],['employee','funcionário ou funcionária'],['manager','gerente'],['colleague','colega de trabalho'],['team','equipe'],['meeting','reunião'],['project','projeto'],['task','tarefa'],
        ['schedule','agenda ou horário'],['deadline','prazo final'],['email','e-mail'],['message','mensagem'],['call','telefonar'],['phone','telefone'],['computer','computador'],['laptop','notebook ou computador portátil'],['screen','tela'],['keyboard','teclado'],
        ['mouse','mouse'],['file','arquivo'],['folder','pasta'],['document','documento'],['report','relatório'],['plan','planejar'],['goal','objetivo'],['idea','ideia'],['problem','problema'],['solution','solução'],
        ['question','pergunta'],['answer','resposta'],['explain','explicar'],['discuss','discutir ou debater'],['send','enviar'],['receive','receber'],['write','escrever'],['read','ler'],['finish','terminar'],['start','começar']
      ],
      phrases: [
        ['I have a meeting today.','Eu tenho uma reunião hoje.',["I've got a meeting today."]],['She works with my team.','Ela trabalha com minha equipe.'],['Please send the file.','Por favor, envie o arquivo.',['Send the file, please.']],['The project is ready.','O projeto está pronto.'],['I read the report.','Eu leio o relatório.'],
        ['We have a new task.','Nós temos uma tarefa nova.'],['Can you answer my question?','Você pode responder à minha pergunta?'],['The computer is on the table.','O computador está sobre a mesa.'],['I need to finish this report.','Eu preciso terminar este relatório.'],['The manager has an idea.','O gerente tem uma ideia.']
      ]
    },
    {
      title: 'Escola e aprendizado', icon: '📚', description: 'Vocabulário para estudar e aprender idiomas.',
      wordAliases: { eraser:['rubber'] },
      entries: [
        ['student','estudante'],['teacher','professor ou professora'],['classroom','sala de aula'],['lesson','lição'],['class','aula'],['course','curso'],['subject','matéria escolar'],['exam','exame (avaliação formal)'],['test','teste'],['homework','lição de casa'],
        ['book','livro'],['notebook','caderno'],['pencil','lápis'],['pen','caneta'],['paper','papel'],['eraser','borracha de apagar'],['ruler','régua'],['board','quadro'],['page','página'],['sentence','frase'],
        ['word','palavra'],['meaning','significado'],['example','exemplo'],['language','idioma ou língua'],['english','inglês'],['portuguese','português'],['study','estudar'],['learn','aprender'],['teach','ensinar'],['practice','praticar'],
        ['review','revisar'],['remember','lembrar'],['understand','entender'],['spell','soletrar'],['pronounce','pronunciar'],['repeat','repetir'],['listen','escutar'],['speak','falar'],['correct','correto ou correta'],['mistake','erro']
      ],
      phrases: [
        ['I study English.','Eu estudo inglês.'],['The teacher reads the sentence.','A professora lê a frase.'],['This word is new.','Esta palavra é nova.'],['Please repeat the question.','Por favor, repita a pergunta.',['Repeat the question, please.']],['I understand the lesson.','Eu entendo a lição.'],
        ['The student has a pencil.','O estudante tem um lápis.'],['Open your book.','Abra seu livro.'],['What does this word mean?','O que esta palavra significa?'],['We practice every day.','Nós praticamos todos os dias.'],['I write in my notebook.','Eu escrevo no meu caderno.']
      ]
    },
    {
      title: 'Corpo e saúde', icon: '💚', description: 'Nomeie partes do corpo e converse sobre cuidados básicos.',
      wordAliases: { sick:['ill'], medicine:['medication'], doctor:['physician'] },
      entries: [
        ['head','cabeça'],['hair','cabelo'],['face','rosto'],['eye','olho'],['ear','orelha ou ouvido'],['nose','nariz'],['mouth','boca'],['tooth','dente'],['neck','pescoço'],['shoulder','ombro'],
        ['arm','braço'],['hand','mão'],['finger','dedo da mão'],['chest','peito'],['back','costas'],['stomach','estômago ou barriga'],['leg','perna'],['knee','joelho'],['foot','pé'],['skin','pele'],
        ['heart','coração'],['body','corpo'],['pain','dor'],['fever','febre'],['cough','tosse'],['cold','resfriado'],['sick','doente'],['healthy','saudável'],['doctor','médico ou médica'],['nurse','enfermeiro ou enfermeira'],
        ['medicine','remédio'],['appointment','consulta ou horário marcado'],['rest','descansar'],['sleep','dormir'],['breathe','respirar'],['drink','beber'],['exercise','exercício'],['patient','paciente'],['hurt','doer'],['better','melhor']
      ],
      phrases: [
        ['My head hurts.','Minha cabeça dói.',['I have a headache.']],['She has a fever.','Ela está com febre.'],['I need to rest.','Eu preciso descansar.'],['The doctor is here.','O médico está aqui.'],['He drinks water.','Ele bebe água.'],
        ['Please wash your hands.','Por favor, lave as mãos.',['Wash your hands, please.']],['I feel better today.','Eu me sinto melhor hoje.'],['My knee hurts.','Meu joelho dói.'],['The nurse is with the patient.','A enfermeira está com o paciente.'],['We need to sleep.','Nós precisamos dormir.']
      ]
    },
    {
      title: 'Compras e dinheiro', icon: '🛍️', description: 'Peça informações e faça compras com confiança.',
      wordAliases: { store:['shop'], shop:['store'], pants:['trousers'], color:['colour'], cheap:['inexpensive'] },
      entries: [
        ['store','loja'],['shop','loja'],['market','mercado'],['customer','cliente'],['seller','vendedor ou vendedora'],['price','preço'],['money','dinheiro'],['cash','dinheiro em espécie'],['card','cartão'],['coin','moeda'],
        ['bill','conta'],['change','troco'],['receipt','recibo ou comprovante'],['discount','desconto'],['sale','promoção'],['size','tamanho'],['color','cor'],['clothes','roupas'],['shirt','camisa'],['pants','calça'],
        ['shoes','sapatos'],['dress','vestido'],['jacket','jaqueta'],['sock','meia'],['hat','chapéu'],['belt','cinto'],['buy','comprar'],['sell','vender'],['pay','pagar'],['cost','custar'],
        ['cheap','barato ou barata'],['expensive','caro ou cara'],['free','grátis'],['offer','oferta'],['return','devolver'],['smaller','menor (comparativo de pequeno)'],['choose','escolher'],['need','precisar'],['small','pequeno ou pequena'],['large','grande']
      ],
      phrases: [
        ['How much does this cost?','Quanto custa isto?',['How much is this?']],['I need a small shirt.','Eu preciso de uma camisa pequena.'],['Can I pay by card?','Posso pagar com cartão?',['Can I pay with a card?','May I pay by card?']],['This store has a sale.','Esta loja tem uma promoção.'],['The shoes are expensive.','Os sapatos são caros.'],
        ['I want to buy a jacket.','Eu quero comprar uma jaqueta.'],['Do you have a smaller size?','Você tem um tamanho menor?'],['The customer has a receipt.','O cliente tem um comprovante.'],['This is free.','Isto é grátis.'],['Can I return this shirt?','Posso devolver esta camisa?']
      ]
    },
    {
      title: 'Tempo e natureza', icon: '🌤️', description: 'Fale sobre o clima, as estações e o mundo ao redor.',
      wordAliases: { autumn:['fall'], sunlight:['sunshine'] },
      entries: [
        ['weather','clima ou tempo atmosférico'],['sun','sol'],['sunlight','luz do sol'],['rain','chuva'],['wind','vento'],['cloud','nuvem'],['sky','céu'],['snow','neve'],['ice','gelo'],['storm','tempestade'],
        ['thunder','trovão'],['lightning','relâmpago'],['temperature','temperatura'],['hot','quente'],['cold','frio ou fria'],['warm','morno ou ameno'],['cool','fresco ou fresca'],['dry','seco ou seca'],['wet','molhado ou molhada'],['season','estação do ano'],
        ['spring','primavera'],['summer','verão'],['autumn','outono'],['winter','inverno'],['morning','manhã'],['afternoon','tarde'],['evening','início da noite'],['night','noite'],['today','hoje'],['tomorrow','amanhã'],
        ['yesterday','ontem'],['week','semana'],['month','mês'],['year','ano'],['tree','árvore'],['flower','flor'],['grass','grama'],['river','rio'],['mountain','montanha'],['beach','praia']
      ],
      phrases: [
        ['It is cold today.','Está frio hoje.',["It's cold today."]],['The sun is in the sky.','O sol está no céu.'],['I like summer.','Eu gosto do verão.',['I like the summer.']],['The rain is heavy.','A chuva está forte.'],['The tree is near the river.','A árvore fica perto do rio.'],
        ['The weather is warm.','O tempo está agradavelmente quente.'],['The grass is wet.','A grama está molhada.'],['We go to the beach in summer.','Nós vamos à praia no verão.',['We go to the beach during summer.']],['The flowers are beautiful.','As flores são bonitas.'],['The mountain is far away.','A montanha fica longe.',['The mountain is far.']]
      ]
    }
  ];
  const explicitExamples = {
    'Em casa': { clean: ['I ___ my room.', 'Eu limpo meu quarto.'] },
    'Trabalho e escritório': { answer: ['This is the ___.', 'Esta é a resposta.'] },
    'Corpo e saúde': { hurt: ['My hands ___.', 'Minhas mãos doem.'] }
  };
  window.VocaExtraTracks = tracks.map(({entries, ...track}) => {
    const examples = {};
    for (const [word] of entries) {
      const wholeWord = new RegExp(`\\b${word}\\b`, 'i');
      const pair = track.phrases.find(([sentence]) => wholeWord.test(sentence));
      if (pair) examples[word] = {
        text: pair[0].replace(new RegExp(`\\b${word}\\b`, 'gi'), '___'),
        translation: pair[1],
        source: 'exemplo original do jogo'
      };
      if(!examples[word]&&window.VocaTrailExamples?.[word]) examples[word]=window.VocaTrailExamples[word];
      const override = explicitExamples[track.title]?.[word];
      if (override) examples[word] = { text: override[0], translation: override[1], source: 'exemplo original do jogo' };
    }
    return { ...track, words: entries.map(([word]) => word), glosses: Object.fromEntries(entries), examples };
  });
})();
