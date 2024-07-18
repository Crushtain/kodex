import fs from "fs"
import path from "path"


// Путь к папке с файлами
const folderPath = 'C:\\Новая папка';
// Искомая подстрока
const searchString = 'Найди мне Челси в таблице АПЛ ';

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');

}

function parseFileContent(content) {
    //Регулярное выражение, которое ищет все <p> теги в любом регистре , допуская наличие атрибутов у тега.
    const regex = /<p.*?>(.*?)<\/p>/ig;
    //Находим теги, удовлетворяющие регулярному выражению
    const matches = content.match(regex) || [];
    //Сохраняем только те теги, которые включают искомую подстроку
    const filteredMatches = matches.filter(match => match.includes(searchString));
    return filteredMatches.length;
}

function processFiles() {
    //Ловим ошибку при чтении папки
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            console.log('Указано неверное имя папки или к ней нет доступа')
            return;
        }
        //Фильтруем только нужные файлы
        files.filter(file => file.endsWith('.html') || file.endsWith('.htm')).forEach(file => {
            //Находим путь к файлу, читаем, выводим количество найденных тегов <p>
            const filePath = path.join(folderPath, file);
            const content = readFile(filePath);
            const count = parseFileContent(content);
            console.log(`File: ${file}, Paragraphs containing '${searchString}': ${count}`);
        });
    });
}

processFiles()