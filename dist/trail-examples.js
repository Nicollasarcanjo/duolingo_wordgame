/* Frases originais para os sentidos específicos das trilhas temáticas. */
(() => {
  const rows=`
egg|I eat an ___ for breakfast.|Eu como um ovo no café da manhã.
cheese|The ___ is in the fridge.|O queijo está na geladeira.
butter|I put ___ on my bread.|Eu coloco manteiga no pão.
coffee|I drink ___ in the morning.|Eu tomo café de manhã.
juice|This ___ is cold.|Este suco está gelado.
fruit|I eat ___ every day.|Eu como fruta todos os dias.
banana|She eats a ___.|Ela come uma banana.
orange|I eat an ___ after lunch.|Eu como uma laranja depois do almoço.
vegetable|A carrot is a ___.|A cenoura é um legume.
tomato|The ___ is red.|O tomate é vermelho.
potato|The ___ is on the plate.|A batata está no prato.
onion|I cut an ___.|Eu corto uma cebola.
carrot|The rabbit eats a ___.|O coelho come uma cenoura.
meat|The ___ is ready.|A carne está pronta.
chicken|We eat ___ for lunch.|Nós comemos frango no almoço.
fish|I like to eat ___.|Eu gosto de comer peixe.
salad|The ___ is fresh.|A salada está fresca.
sugar|I put ___ in my coffee.|Eu coloco açúcar no café.
pepper|I add ___ to the soup.|Eu coloco pimenta na sopa.
breakfast|We eat ___ at seven.|Nós tomamos café da manhã às sete.
lunch|I eat ___ at noon.|Eu almoço ao meio-dia.
plate|The food is on the ___.|A comida está no prato.
spoon|I eat soup with a ___.|Eu como sopa com uma colher.
fork|The ___ is on the table.|O garfo está na mesa.
knife|I cut bread with a ___.|Eu corto pão com uma faca.
thirsty|I am ___ and need water.|Estou com sede e preciso de água.
house|This ___ is small.|Esta casa é pequena.
home|I am happy at ___.|Estou feliz em casa.
kitchen|I cook in the ___.|Eu cozinho na cozinha.
apartment|She lives in an ___.|Ela mora em um apartamento.
window|Please open the ___.|Por favor, abra a janela.
wall|The picture is on the ___.|O quadro está na parede.
ceiling|The light is on the ___.|A luz está no teto.
roof|Rain falls on the ___.|A chuva cai no telhado.
key|I need the ___ to open the door.|Preciso da chave para abrir a porta.
pillow|My head is on the ___.|Minha cabeça está no travesseiro.
blanket|The ___ is on the bed.|O cobertor está na cama.
sheet|The ___ is clean.|O lençol está limpo.
sofa|We sit on the ___.|Nós nos sentamos no sofá.
chair|The ___ is next to the table.|A cadeira fica perto da mesa.
light|Please turn on the ___.|Por favor, acenda a luz.
mirror|I look in the ___.|Eu olho no espelho.
shelf|The books are on the ___.|Os livros estão na prateleira.
drawer|The keys are in the ___.|As chaves estão na gaveta.
closet|My clothes are in the ___.|Minhas roupas estão no armário.
stove|The pot is on the ___.|A panela está no fogão.
oven|The bread is in the ___.|O pão está no forno.
sink|The dishes are in the ___.|A louça está na pia.
shower|I take a ___.|Eu tomo banho de chuveiro.
soap|I wash my hands with ___.|Eu lavo as mãos com sabão.
broom|I clean the floor with a ___.|Eu limpo o chão com uma vassoura.
basket|The clothes are in the ___.|As roupas estão no cesto.
wash|I ___ my hands before lunch.|Eu lavo as mãos antes do almoço.
parent|A ___ takes care of a child.|Um pai ou uma mãe cuida de uma criança.
daughter|Their ___ is five years old.|A filha deles tem cinco anos.
son|Her ___ is at school.|O filho dela está na escola.
child|The ___ is playing.|A criança está brincando.
grandmother|My ___ tells stories.|Minha avó conta histórias.
grandfather|My ___ lives nearby.|Meu avô mora perto.
aunt|My ___ is my mother's sister.|Minha tia é irmã da minha mãe.
uncle|My ___ is my father's brother.|Meu tio é irmão do meu pai.
nephew|My ___ is my sister's son.|Meu sobrinho é filho da minha irmã.
niece|My ___ is my sister's daughter.|Minha sobrinha é filha da minha irmã.
neighbor|Our ___ lives next door.|Nosso vizinho mora ao lado.
partner|My ___ and I live together.|Meu parceiro e eu moramos juntos.
husband|Her ___ is a teacher.|O marido dela é professor.
wife|His ___ is a doctor.|A esposa dele é médica.
wedding|The ___ is on Saturday.|A cerimônia de casamento é no sábado.
couple|The ___ lives together.|O casal mora junto.
guest|Our ___ arrives today.|Nosso convidado chega hoje.
person|That ___ is my friend.|Aquela pessoa é minha amiga.
people|Many ___ live here.|Muitas pessoas moram aqui.
name|What is your ___?|Qual é o seu nome?
age|What is your ___?|Qual é a sua idade?
welcome|You are ___ here.|Você é bem-vindo aqui.
meet|I want to ___ your family.|Quero conhecer sua família.
share|We ___ our food.|Nós compartilhamos nossa comida.
talk|We ___ every day.|Nós conversamos todos os dias.
listen|Please ___ to me.|Por favor, me escute.
hug|I ___ my friend.|Eu abraço meu amigo.
road|The ___ goes to the city.|A estrada vai para a cidade.
avenue|The hotel is on this ___.|O hotel fica nesta avenida.
block|The store is one ___ away.|A loja fica a um quarteirão daqui.
traffic|The ___ is slow today.|O trânsito está lento hoje.
bridge|We walk across the ___.|Nós atravessamos a ponte a pé.
square|The children play in the ___.|As crianças brincam na praça.
building|This ___ is tall.|Este prédio é alto.
supermarket|I buy food at the ___.|Eu compro comida no supermercado.
cafe|We drink coffee at the ___.|Nós tomamos café na cafeteria.
airport|The plane leaves the ___.|O avião sai do aeroporto.
office|She works in an ___.|Ela trabalha em um escritório.
church|The ___ is near the park.|A igreja fica perto do parque.
map|I look at the ___.|Eu olho o mapa.
direction|Which ___ is the station?|Em que direção fica a estação?
north|The city is to the ___.|A cidade fica ao norte.
south|The beach is to the ___.|A praia fica ao sul.
east|The sun rises in the ___.|O sol nasce no leste.
west|The sun sets in the ___.|O sol se põe no oeste.
right|Turn ___ at the corner.|Vire à direita na esquina.
far|The station is ___ away.|A estação fica longe.
luggage|My ___ is at the hotel.|Minha bagagem está no hotel.
bag|My ___ is on the chair.|Minha bolsa está na cadeira.
car|We travel by ___.|Nós viajamos de carro.
taxi|I take a ___ to the airport.|Eu pego um táxi para o aeroporto.
subway|We take the ___ downtown.|Nós pegamos o metrô para o centro.
bicycle|I ride my ___ to work.|Vou de bicicleta ao trabalho.
motorcycle|He rides a ___.|Ele anda de motocicleta.
boat|We travel across the lake by ___.|Nós atravessamos o lago de barco.
ship|The ___ is at sea.|O navio está no mar.
flight|Our ___ leaves at noon.|Nosso voo parte ao meio-dia.
journey|The ___ takes two hours.|O trajeto leva duas horas.
trip|Our ___ starts tomorrow.|Nossa viagem começa amanhã.
platform|The train leaves from this ___.|O trem parte desta plataforma.
seat|This ___ is free.|Este assento está livre.
passenger|Each ___ has a ticket.|Cada passageiro tem uma passagem.
stop|The bus ___ is near here.|O ponto de ônibus fica perto daqui.
depart|We ___ at seven.|Nós partimos às sete.
arrive|We ___ at noon.|Nós chegamos ao meio-dia.
leave|We ___ the hotel early.|Nós saímos do hotel cedo.
return|We ___ home tomorrow.|Nós voltamos para casa amanhã.
book|I want to ___ a room.|Quero reservar um quarto.
entrance|The ___ is on the left.|A entrada fica à esquerda.
gate|Our flight leaves from this ___.|Nosso voo parte deste portão de embarque.
route|This ___ goes to the station.|Esta rota vai até a estação.
delay|There is a flight ___.|Há um atraso no voo.
schedule|Check the train ___.|Confira o horário dos trens.
destination|Our ___ is São Paulo.|Nosso destino é São Paulo.
tourist|The ___ visits the museum.|O turista visita o museu.
vehicle|A bus is a ___.|Um ônibus é um veículo.
work|I ___ from home.|Eu trabalho de casa.
job|She has a new ___.|Ela tem um emprego novo.
company|The ___ has an office here.|A empresa tem um escritório aqui.
employee|The ___ works at the office.|O funcionário trabalha no escritório.
colleague|My ___ helps me at work.|Minha colega de trabalho me ajuda no trabalho.
deadline|The ___ is Friday.|O prazo final é sexta-feira.
email|I send an ___ to my team.|Eu envio um e-mail à minha equipe.
message|I read your ___.|Eu leio sua mensagem.
call|I ___ my colleague.|Eu telefono para meu colega.
phone|My ___ is on the desk.|Meu telefone está na mesa.
laptop|I use my ___ at work.|Eu uso meu notebook no trabalho.
screen|The ___ is bright.|A tela está brilhante.
keyboard|I type on the ___.|Eu digito no teclado.
mouse|I use the ___ to click.|Eu uso o mouse para clicar.
folder|The document is in the ___.|O documento está na pasta.
document|Please read this ___.|Por favor, leia este documento.
plan|We ___ the meeting together.|Nós planejamos a reunião juntos.
goal|Our ___ is to finish today.|Nosso objetivo é terminar hoje.
problem|We have a ___.|Nós temos um problema.
solution|We found a ___.|Nós encontramos uma solução.
explain|Please ___ the problem.|Por favor, explique o problema.
discuss|We ___ the idea together.|Nós debatemos a ideia juntos.
receive|I ___ messages from my team.|Eu recebo mensagens da minha equipe.
write|I ___ an email.|Eu escrevo um e-mail.
start|We ___ work at nine.|Nós começamos o trabalho às nove.
classroom|The students are in the ___.|Os alunos estão na sala de aula.
class|My English ___ starts at nine.|Minha aula de inglês começa às nove.
course|I take an English ___.|Eu faço um curso de inglês.
subject|Math is my favorite ___.|Matemática é minha matéria favorita.
exam|I study for the ___.|Eu estudo para o exame.
test|The ___ is tomorrow.|O teste é amanhã.
homework|I do my ___ after school.|Eu faço minha lição de casa depois da escola.
pen|I write with a ___.|Eu escrevo com uma caneta.
paper|I write on ___.|Eu escrevo no papel.
eraser|I use an ___ to remove pencil marks.|Eu uso uma borracha para apagar marcas de lápis.
ruler|I use a ___ to draw a straight line.|Eu uso uma régua para desenhar uma linha reta.
board|The teacher writes on the ___.|A professora escreve no quadro.
page|Open the book to this ___.|Abra o livro nesta página.
meaning|What is the ___ of this word?|Qual é o significado desta palavra?
example|This is an ___.|Este é um exemplo.
language|English is a ___.|Inglês é um idioma.
portuguese|I speak ___.|Eu falo português.
learn|I ___ new words every day.|Eu aprendo palavras novas todos os dias.
teach|They ___ English at school.|Eles ensinam inglês na escola.
review|I ___ the words tomorrow.|Eu reviso as palavras amanhã.
remember|I ___ this word.|Eu lembro desta palavra.
spell|Can you ___ your name?|Você pode soletrar seu nome?
pronounce|How do you ___ this word?|Como você pronuncia esta palavra?
speak|We ___ English in class.|Nós falamos inglês na aula.
correct|Your answer is ___.|Sua resposta está correta.
mistake|I made a ___.|Eu cometi um erro.
hair|Her ___ is long.|O cabelo dela é comprido.
face|I wash my ___.|Eu lavo o rosto.
eye|Close one ___.|Feche um olho.
ear|I hear with my ___.|Eu ouço com meu ouvido.
nose|My ___ is cold.|Meu nariz está frio.
mouth|Please open your ___.|Por favor, abra a boca.
tooth|I brush each ___.|Eu escovo cada dente.
neck|My ___ hurts.|Meu pescoço dói.
shoulder|My ___ hurts.|Meu ombro dói.
arm|Raise your ___.|Levante o braço.
hand|Wash your ___.|Lave a mão.
finger|Point with your ___.|Aponte com o dedo da mão.
chest|I feel pain in my ___.|Eu sinto dor no peito.
back|My ___ hurts.|Minhas costas doem.
stomach|My ___ hurts.|Meu estômago dói.
leg|My ___ hurts.|Minha perna dói.
foot|My ___ hurts.|Meu pé dói.
skin|The ___ is dry.|A pele está seca.
heart|The ___ pumps blood.|O coração bombeia sangue.
body|Exercise helps the ___.|O exercício ajuda o corpo.
pain|I feel ___ in my leg.|Eu sinto dor na perna.
cough|I have a ___.|Eu estou com tosse.
cold|I have a ___.|Eu estou resfriado.
sick|I feel ___.|Eu me sinto doente.
healthy|Eating well helps us stay ___.|Comer bem ajuda a nos manter saudáveis.
medicine|Take your ___.|Tome seu remédio.
appointment|I have a doctor's ___ today.|Eu tenho uma consulta médica hoje.
breathe|I ___ slowly.|Eu respiro devagar.
drink|I ___ water.|Eu bebo água.
exercise|Walking is good ___.|Caminhar é um bom exercício.
shop|I buy shoes at the ___.|Eu compro sapatos na loja.
market|We buy fruit at the ___.|Nós compramos fruta no mercado.
seller|The ___ works at the store.|A vendedora trabalha na loja.
price|What is the ___?|Qual é o preço?
money|I need ___ to pay.|Eu preciso de dinheiro para pagar.
cash|I pay in ___.|Eu pago em dinheiro.
coin|I have a ___.|Eu tenho uma moeda.
bill|Please bring the ___.|Por favor, traga a conta.
change|Here is your ___.|Aqui está seu troco.
discount|This item has a ___.|Este produto tem desconto.
color|What ___ is your shirt?|Qual é a cor da sua camisa?
clothes|I buy new ___.|Eu compro roupas novas.
pants|These ___ are blue.|Esta calça é azul.
dress|Her ___ is red.|O vestido dela é vermelho.
sock|I have one blue ___.|Eu tenho uma meia azul.
hat|He wears a ___.|Ele usa um chapéu.
belt|This ___ is black.|Este cinto é preto.
sell|They ___ shoes here.|Eles vendem sapatos aqui.
cheap|This shirt is ___.|Esta camisa é barata.
offer|This is a good ___.|Esta é uma boa oferta.
choose|I ___ the blue shirt.|Eu escolho a camisa azul.
large|This bag is ___.|Esta bolsa é grande.
sunlight|The ___ comes through the window.|A luz do sol entra pela janela.
wind|The ___ is strong today.|O vento está forte hoje.
cloud|There is a ___ in the sky.|Há uma nuvem no céu.
snow|The ___ is white.|A neve é branca.
ice|There is ___ in my glass.|Há gelo no meu copo.
storm|The ___ is coming.|A tempestade está chegando.
thunder|I hear ___.|Eu ouço trovão.
lightning|I see ___ in the sky.|Eu vejo um relâmpago no céu.
temperature|The ___ is low today.|A temperatura está baixa hoje.
hot|The weather is ___.|O tempo está quente.
cool|The weather is ___ today.|O tempo está fresco hoje.
dry|The grass is ___.|A grama está seca.
season|Summer is my favorite ___.|O verão é minha estação favorita.
spring|Flowers grow in ___.|As flores crescem na primavera.
autumn|Leaves fall in ___.|As folhas caem no outono.
winter|It is cold in ___.|Faz frio no inverno.
morning|I study in the ___.|Eu estudo de manhã.
afternoon|I work in the ___.|Eu trabalho à tarde.
evening|We eat in the ___.|Nós comemos no começo da noite.
night|The stars shine at ___.|As estrelas brilham à noite.
tomorrow|I will study ___.|Eu vou estudar amanhã.
yesterday|I studied ___.|Eu estudei ontem.
week|There are seven days in a ___.|Há sete dias em uma semana.
month|I study English every ___.|Eu estudo inglês todo mês.
year|A ___ has twelve months.|Um ano tem doze meses.
flower|The ___ is beautiful.|A flor é bonita.
`;
  const examples={};
  for(const row of rows.trim().split('\n')){const [word,text,translation]=row.split('|');examples[word]={text,translation,source:'exemplo original do jogo'};}
  window.VocaTrailExamples=examples;
})();
