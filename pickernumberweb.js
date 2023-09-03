const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')
const fs = require('fs-extra')

const port = 8080;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const prefixnumber = ['08', '628', '+628'];
const alloperatorprefix = ['55', '56', '57', '58', '14', '15', '16', '11', '52', '53', '12', '13', '21', '22', '23', '51', '17', '18', '19', '59', '77', '78', '32', '33', '38', '95', '96', '97', '98', '99', '81', '82', '83', '84', '85', '86', '87', '88', '89'];
const optelkom = ['52', '53', '11', '12', '13', '21', '22', '23', '51']
const opindosat = ['55', '56', '57', '58', '14', '15', '16']
const opxl = ['17', '18', '19', '59', '77', '78']
const opaxis = ['32', '33', '38']
const opthree = ['95', '96', '97', '98', '99']
const opsmart = ['81', '82', '83', '84', '85', '86', '87', '88', '89']
const extendwa = 'https://wa.me/'
const errorgif = ['https://media4.giphy.com/media/lYXBlhqRv7QKudmJsG/giphy.gif?cid=ecf05e47ab7gtywojsby14fctffj0l0kjtswr3iofn222wv1&ep=v1_gifs_search&rid=giphy.gif&ct=g','https://media1.giphy.com/media/eojuxhwbdIzRiBs45u/giphy.gif?cid=ecf05e47ab7gtywojsby14fctffj0l0kjtswr3iofn222wv1&ep=v1_gifs_search&rid=giphy.gif&ct=g','https://media3.giphy.com/media/DjYtNOSmFDR4dA8DVc/giphy.gif?cid=ecf05e47ab7gtywojsby14fctffj0l0kjtswr3iofn222wv1&ep=v1_gifs_search&rid=giphy.gif&ct=g','https://media4.giphy.com/media/D71tmckSZTHTBJuUHP/giphy.gif?cid=ecf05e47ab7gtywojsby14fctffj0l0kjtswr3iofn222wv1&ep=v1_gifs_search&rid=giphy.gif&ct=g','https://media0.giphy.com/media/WHvqEBFypwKhMex2Bz/giphy.gif?cid=ecf05e471ei4bocoo270v29tw0xxa1smrecsr3t7rgk4dldi&ep=v1_gifs_related&rid=giphy.gif&ct=g','https://media2.giphy.com/media/LFnz4shF84vxh35cOZ/giphy.gif?cid=ecf05e471ei4bocoo270v29tw0xxa1smrecsr3t7rgk4dldi&ep=v1_gifs_related&rid=giphy.gif&ct=g','https://media1.giphy.com/media/dqSGqhxgqzeHINDoYZ/giphy.gif?cid=ecf05e471ei4bocoo270v29tw0xxa1smrecsr3t7rgk4dldi&ep=v1_gifs_related&rid=giphy.gif&ct=g','https://media1.giphy.com/media/FjQkAi5DffT5YpDKzJ/giphy.gif?cid=ecf05e471ei4bocoo270v29tw0xxa1smrecsr3t7rgk4dldi&ep=v1_gifs_related&rid=giphy.gif&ct=g','https://media1.giphy.com/media/6F7lYYy25r9j9v1OXq/giphy.gif?cid=ecf05e471ei4bocoo270v29tw0xxa1smrecsr3t7rgk4dldi&ep=v1_gifs_related&rid=giphy.gif&ct=g']
const dataArray = [];
const dataArray2 = [];
const dataArray3 = [];
let count = 0;
let targeto = 0;
let range = 0;
let indexoperator = "";
let indexprefix = "";
let datastringmentah = "";
let datastringmatang = "";

function getCurrentDateTime() {
  const currentDate = new Date();

  // Mendapatkan tanggal dalam format YYYY-MM-DD
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tambahkan 1 karena bulan dimulai dari 0
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year}`;

  // Mendapatkan waktu dalam format HH:MM:SS
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

async function checknum(number){
    const data = await axios.get(`https://male-than-angola-pull.trycloudflare.com/checkNumberStatus?number=`+number); //API VALIDATOR WA
    return data.data.status.canReceiveMessage
  }

function konversiDetikKeFormatWaktu(detik) {
    const hari = Math.floor(detik / (24 * 3600));
    let sisaDetik = detik % (24 * 3600);
  
    const jam = Math.floor(sisaDetik / 3600);
    sisaDetik %= 3600;
  
    const menit = Math.floor(sisaDetik / 60);
    sisaDetik %= 60;
  
    const detikSisa = sisaDetik;
  
    return `${hari}:${jam}:${menit}:${detikSisa}`;
  }

  function get_random(arraynya) {
    return arraynya[Math.floor(Math.random() * arraynya.length)];
  }
  
  function generateRandomNumber(length) {
    const max = Math.pow(10, length) - 1;
    const min = Math.pow(10, length - 1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function getRandomErrorGif() {
    const randomIndex = Math.floor(Math.random() * errorgif.length);
    return errorgif[randomIndex];
  }

  app.post('/download', (req, res) => {
    const type = req.body.type;
  
    if(type == '') return res.redirect('/error');

    if(type == '2'){
    res.download('./txtweb/totaltxt.txt', 'total.txt', (err) => {
      if (err) {
        console.error('Terjadi kesalahan saat mengunduh file:', err);
        //res.status(500).send('Terjadi kesalahan saat mengunduh file.');
        res.redirect('/error');
      }
    });
  } else if(type == '1'){
    res.download('./txtweb/usertxt.txt', 'result.txt', (err) => {
      if (err) {
        console.error('Terjadi kesalahan saat mengunduh file:', err);
        //res.status(500).send('Terjadi kesalahan saat mengunduh file.');
        res.redirect('/error');
      }
    });
  } else {
    return res.redirect('/error');
  }
  });

  
  app.get('/error', (req, res) => {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>error</title>
      <link rel="icon" type="image/png" href="./error.png">
      <style>
      body {
        margin: 0;
        padding: 0;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
        transition: background 2s;
        background: #ff5733; /* Warna latar belakang awal */
      }
    
        h1 {
          font-size: 36px;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          margin-bottom: 30px; /* Jarak antara h1 dan gambar gif */
        }

        h2 {
            font-size: 30px;
            color: white;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            margin-bottom: 30px; /* Jarak antara h1 dan gambar gif */
          }

          .h3 {
            font-size: 10px;
            color: white;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            text-align: bottom;
          }
    
        img#errorGif {
          max-width: 100%;
          height: auto;
        }
      </style>
    </head>
    <body>
      <h1>ERROR 404!</h1>
      <h2>Parameter Salah/Tujuan tidak ditemukan :(</h2>
      <a class='h3' href='https://giphy.com/SappySealsCommunity/'>gif source</a>
      <img id="errorGif" alt="Error GIF">
      <script>
        const colors = ["#ff5733", "#33ff57", "#5733ff", "#ff33f7"];
        let currentIndex = 0;
    
        function changeBackgroundColor() {
          document.body.style.background = colors[currentIndex];
          currentIndex = (currentIndex + 1) % colors.length;
        }
    
        setInterval(changeBackgroundColor, 2000); // Ganti warna setiap 2 detik
    
        const errorGifs = [
          'https://i.giphy.com/media/FjQkAi5DffT5YpDKzJ/giphy.webp',
          'https://i.giphy.com/media/lYXBlhqRv7QKudmJsG/giphy.webp',
          'https://i.giphy.com/media/eojuxhwbdIzRiBs45u/giphy.webp',
          'https://i.giphy.com/media/DjYtNOSmFDR4dA8DVc/giphy.webp',
          'https://i.giphy.com/media/D71tmckSZTHTBJuUHP/giphy.webp',
          'https://i.giphy.com/media/WHvqEBFypwKhMex2Bz/giphy.webp',
          'https://i.giphy.com/media/LFnz4shF84vxh35cOZ/giphy.webp',
          'https://i.giphy.com/media/dqSGqhxgqzeHINDoYZ/giphy.webp',
          'https://i.giphy.com/media/FjQkAi5DffT5YpDKzJ/giphy.webp',
          'https://i.giphy.com/media/6F7lYYy25r9j9v1OXq/giphy.webp',
          'https://i.giphy.com/media/FHUHzl6idA47K8InOK/giphy.webp',
          'https://i.giphy.com/media/jXVS5gX2DFlQwvr73M/giphy.webp',
          'https://i.giphy.com/media/ALtclqAuSTBi58DPBi/giphy.webp',
          'https://i.giphy.com/media/gjd8PRwEtNxmSMSqFV/giphy.webp',
          'https://i.giphy.com/media/Sl3SwvIldN2o4zHjxN/giphy.webp',
          'https://i.giphy.com/media/Q9lGZeXdMqW81pkDzd/giphy.webp',
          'https://i.giphy.com/media/3QBNmsdmLBmThawrwV/giphy.webp',
          'https://i.giphy.com/media/B1DXFnVz4xiagBST9W/giphy.webp',
          'https://i.giphy.com/media/RWCz7awbylfZJ4I5ER/giphy.webp',
          'https://i.giphy.com/media/W7OsDjnrTw7wrqjP6F/giphy.webp',
          'https://i.giphy.com/media/DXGQS2PjUWgAxUpX7z/giphy.webp',
          'https://i.giphy.com/media/SRhsG2wq7anCtRxSIx/giphy.webp',
          'https://i.giphy.com/media/AuRkiVOQAWc28san3I/giphy.webp',
          'https://i.giphy.com/media/jmeZR9hnC3rDKF23nn/giphy.webp',
          'https://i.giphy.com/media/wPMKoWX0myGqUwEcEa/giphy.webp',
          'https://i.giphy.com/media/NhemNBukgOujyy8Kah/giphy.webp',
          'https://i.giphy.com/media/UEJg99Rqur32kkDpa1/giphy.webp',
          'https://i.giphy.com/media/bjBVnjts3eNRLmnKn4/giphy.webp',
          'https://i.giphy.com/media/s35Ct9ESlBImBVMkWs/giphy.webp',
          'https://i.giphy.com/media/QSbFzzYhA5ti9gGxQy/giphy.webp',
        ];
    
        function getRandomErrorGif() {
            const randomIndex = Math.floor(Math.random() * errorGifs.length);
            return errorGifs[randomIndex];
          }
      
          const errorGifElement = document.getElementById('errorGif');
      
          function changeErrorGif() {
            errorGifElement.src = getRandomErrorGif();
          }
      
          setInterval(changeErrorGif, 1000); // Ganti gambar gif setiap 1 detik
        </script>
      </body>
      </html>`
    res.send(html)
  });

// Tampilan halaman form
app.get('/', (req, res) => {
    const newLocal = `
    <html>
    <head>
    <link rel="icon" type="image/png" href="./icon.png">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .page-title {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-top: 10px;
        }
        .h1 {
            position : relative;
            bottom: 20%;
        }
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
            flex-direction: column;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh; /* Memastikan tinggi minimal hingga ke bawah layar */
        }

        .form-container {
            width: 90%; /* Menyesuaikan dengan layar kecil */
            max-width: 400px; /* Lebar maksimum untuk tampilan pada layar yang lebih besar */
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        /* Style untuk layar kecil (responsif) */
        @media screen and (max-width: 600px) {
            .form-container {
                width: 100%; /* Mengisi seluruh lebar layar pada layar kecil */
                margin-top: 20px; /* Menambahkan jarak atas */
            }
        }

    /* Style untuk label */
    label {
        font-weight: bold;
    }

    /* Style untuk select */
    .form-select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        outline: none;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    /* Style untuk option yang dipilih */
    .form-select option[selected] {
        font-weight: bold;
        color: #333;
    }

    /* Style untuk tombol "Choose..." */
    .form-select option[value=""] {
        color: #999;
    }

    /* Style untuk container form */
    /*
        .form-container {
            width: 300px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }*/

        /* Style untuk label */
        label {
            font-weight: bold;
        }

        /* Style untuk input number */
        input[type="number"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
            outline: none;
            margin-top: 10px;
            margin-bottom: 20px;
        }

        /* Style untuk input text */
        input[type="text"] {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
            outline: none;
            margin-top: 10px;
            margin-bottom: 20px;
        }

    /* Style untuk tombol submit (jika diperlukan) */
    .submit-button {
        display: block;
        width: 100%;
        padding: 10px;
        background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
        color: #fff;
        border: none;
        border-radius: 3px;
        margin-top: 10px;
        cursor: pointer;
    }

    br{
      text-align: center;
      align-items: center;
      justify-content: center;
    }

    /* Style saat hover di tombol submit */
    .submit-button:hover {
        background-color: #0056b3;
    }
    </style>
    <title>Generate Random Nomor & Sorting Gacha Nomor WA</title>
    
    </head>
      <body>
      <div style="text-align: center;">
      <h1 class="h1">Generate Random Nomor</h1>
      <h1 class="h1">&</h1>
      <h1 class="h1">Sorting Gacha Nomor WA</h1>
    </div>
        <form method="post" action="/hasil">
        <label for="provider">Pilih Provider:</label>
        <select class="form-select" id="provider" name="provider">
            <option selected>Choose...</option>
            <option value="1">Random</option>
            <option value="2">Telkomsel</option>
            <option value="3">Indosat</option>
            <option value="4">XL</option>
            <option value="5">Axis</option>
            <option value="6">Three</option>
            <option value="7">Smartfren</option>
        </select>

        <label for="angka">Pilih Digit Angka (8-13):</label>
        <input type="number" name="angka" id="angka" min="8" max="13">
        <br>
        <label for="nomor">Masukkan jumlah:</label>
        <input type="number" name="nomor" id="nomor">
        <!-- Jika Anda ingin menambahkan tombol submit -->
        <input type="submit" value="Generate" class="submit-button"/>    
        </div>
        </form>
      </body>
    </html>
  `;
  res.send(newLocal);
});

// Handle form submission
app.post('/hasil', async (req, res) => {
  const provider = req.body.provider;
  const angka = req.body.angka
  const digit = Number(angka) - 4
  const target = req.body.nomor;
  targeto = target
  range = Number(angka)

  if(provider == '' || angka == '' || digit == '' || target == '' ) return res.redirect('/error');

  console.log(`Provider: ${provider}, Digit: ${angka}, Target: ${target}`);
  //res.send(`Hasil: Provider - ${provider}, Digit - ${angka}, Target - ${target}`);

    for (let i = 0; i < target; i++) {

    if (provider == '1'){ //all operator
      var getoperatornumber = get_random(alloperatorprefix);
      var get9digitrandom = generateRandomNumber(digit);
      indexoperator = `All Random`
    } else if(provider == '2'){ //op telkom
      var getoperatornumber = get_random(optelkom);
      var get9digitrandom = generateRandomNumber(digit);
      indexoperator = `Telkomsel`
    } else if(provider == '3'){ //op indosat
      var getoperatornumber = get_random(opindosat);
      var get9digitrandom = generateRandomNumber(digit);
      indexoperator = `Indosat`
    } else if(provider == '4'){ //op xl
      var getoperatornumber = get_random(opxl);
      var get9digitrandom = generateRandomNumber(digit);
      indexoperator = `XL`
    } else if(provider == '5'){ //op axis
      var getoperatornumber = get_random(opaxis);
      var get9digitrandom = generateRandomNumber(digit);
      indexoperator = `Axis`
    } else if(provider == '6'){ //op three
      var getoperatornumber = get_random(opthree);
      var get9digitrandom = generateRandomNumber(digit);
      indexoperator = `Three`
    } else if(provider == '7'){ //op smartfreen
      var getoperatornumber = get_random(opsmart);
      var get9digitrandom = generateRandomNumber(digit);
      indexoperator = `Smartfreen`
    } else{
      return console.log('choice mode first')
    }

    var getrandomnumber = '628'
    var databaru = `${getrandomnumber}${getoperatornumber}${get9digitrandom}`;
    indexprefix = `628xx`
    dataArray.push(databaru);
    dataArray2.push(databaru)  
    datastringmentah += databaru+"\n"
}
    const htmlload = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <link rel="icon" type="image/png" href="./icon.png">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            margin: 0;
            padding: 0;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            align-items: center;
            justify-content: center;
        }
        
        pre {
            white-space: pre-wrap; /* Memastikan baris baru diberikan ruang */
            font-size: 20px;
        }    

        /* Container untuk tombol submit */
        .button-container {
            display: flex;
            justify-content: center; /* Memusatkan horizontal */
            align-items: center; /* Memusatkan vertikal */
            margin-top: 20px; /* Atur jarak dari elemen lain jika diperlukan */
        }
        
        /* Style untuk tombol submit (jika diperlukan) */
        .submit-button {
            width: 40%;
            padding: 10px;
            background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }
        
        /* Style saat hover di tombol submit */
        .submit-button:hover {
            background-color: #0056b3;

        }
        
        /* Style untuk teks estimasi */
        .countdown {
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-top: 10px;
        }
        /* Style untuk animasi loading */
        .loading {
            display: none;
            text-align: center;
            font-size: 24px;
            color: #333;
            margin-bottom : 60px;
        }
    
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
    </style>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Random Result</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <div class="container">
            <pre>
                <!-- Tempatkan string yang dihasilkan di sini -->
<h2>Nomor Random Yang Dihasilkan :</h2>
${datastringmentah}
            </pre>
            <form method="post" action="/sort" onsubmit="showLoading()">
            <div class="button-container">
                <!-- <input id="sorting-button" type="submit" class="submit-button" value="Sorting"/> -->
                <!-- Tambahkan elemen HTML untuk menampilkan estimasi waktu mundur -->
                <div id="countdown" class="countdown"></div>
        
                <!-- Tambahkan elemen HTML untuk animasi loading -->
                <div id="loading" class="loading"></div>
        
                <!-- Tambahkan tombol sorting -->
                <button id="sortButton" class="submit-button">Sorting</button>
            </div>
        </form>
</div>
</form>

<script>
// Inisialisasi variabel waktu awal
let endTime = 0;
let countdownInterval;

// Fungsi untuk memulai hitungan waktu mundur
function startCountdown() {
    // Set waktu akhir estimasi (dalam milidetik)
    endTime = Date.now() + ${target * 1000}; // Estimasi 1 menit (60 detik)

    // Sembunyikan tombol sorting
    document.getElementById("sortButton").style.display = "none";

    // Tampilkan animasi loading
    document.getElementById("loading").style.display = "block";

    // Mulai hitungan waktu mundur
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Fungsi untuk memperbarui estimasi waktu mundur
function updateCountdown() {
    const currentTime = Date.now();
    const timeLeft = endTime - currentTime;

    if (timeLeft <= 0) {
        // Waktu sudah habis
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "Waktu habis!";
    } else {
        // Hitung menit dan detik yang tersisa
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);

        // Format waktu mundur dalam menit dan detik
        const countdownText = \`Estimasi: \${minutes} menit \${seconds} detik\`;
        document.getElementById("countdown").innerHTML = countdownText;
    }
}

// Tambahkan event listener untuk tombol sorting
document.getElementById("sortButton").addEventListener("click", startCountdown);
</script>
        </body>
    </html>    
`

    res.send(htmlload)
    console.log(datastringmentah)
    datastringmentah = ""
    dataArray.length = 0
    estimated = ""
});

app.post('/sort', async (req, res) => {
    const jsonData = dataArray2;

    fs.unlinkSync('./txtweb/usertxt.txt')
    fs.appendFileSync('./txtweb/usertxt.txt', `made by :\nGithub : https://github.com/STalker-Moment\nIG : @tierkunn_\n\n`)

    for (const data of jsonData) {
        const getnum = await checknum(data);
        if (getnum == true) {
            datastringmatang += extendwa + data + "\n";
            dataArray3.push(extendwa + data);
            count = count + 1;
            const currentDateTime = getCurrentDateTime();
            fs.appendFileSync('./txtweb/totaltxt.txt', `[${currentDateTime.date} ${currentDateTime.time} | ${indexoperator} - ${range}]` + extendwa+data+'\n');
            fs.appendFileSync('./txtweb/usertxt.txt', `[${currentDateTime.date} ${currentDateTime.time} | ${indexoperator} - ${range}]` + extendwa+data+'\n');
        }
    }

    var persentase = (count / targeto) * 100;

    fs.appendFileSync('./txtweb/usertxt.txt', `\n\n---------------------------------------------------------\n\nOperator : ${indexoperator}\nDigit : ${range}\nTarget : ${targeto}\n\n${count} / ${targeto} nomor yang valid\nPersentase : ${persentase}%\n\n---------------------------------------------------------`);

    const dataArray3Links = dataArray3.map(item => `<a href="${item}">${item}</a>`).join('\n');
   

        const htmlload = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <link rel="icon" type="image/png" href="./icon.png">
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f0f0f0;
                margin: 0;
                padding: 0;
            }
            
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                align-items: center;
                justify-content: center;
            }
            
            pre {
                white-space: pre-wrap; /* Memastikan baris baru diberikan ruang */
                font-size: 20px;
            }    
    
            /* Container untuk tombol submit */
            .button-container {
                display: flex;
                justify-content: center; /* Memusatkan horizontal */
                align-items: center; /* Memusatkan vertikal */
                margin-top: 20px; /* Atur jarak dari elemen lain jika diperlukan */
            }
            
            /* Style untuk tombol submit (jika diperlukan) */
            .submit-button {
                width: 40%;
                padding: 10px;
                background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
                color: #fff;
                border: none;
                border-radius: 3px;
                cursor: pointer;
            }

            .form-container {
              width: 90%; /* Menyesuaikan dengan layar kecil */
              max-width: 400px; /* Lebar maksimum untuk tampilan pada layar yang lebih besar */
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
  
          /* Style untuk layar kecil (responsif) */
          @media screen and (max-width: 600px) {
              .form-container {
                  width: 100%; /* Mengisi seluruh lebar layar pada layar kecil */
                  margin-top: 20px; /* Menambahkan jarak atas */
              }
          }
  
      /* Style untuk label */
      label {
          font-weight: bold;
      }
  
      /* Style untuk select */
      .form-select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 3px;
          outline: none;
          margin-top: 10px;
          margin-bottom: 20px;
      }
  
      /* Style untuk option yang dipilih */
      .form-select option[selected] {
          font-weight: bold;
          color: #333;
      }
  
      /* Style untuk tombol "Choose..." */
      .form-select option[value=""] {
          color: #999;
      }
  
      /* Style untuk container form */
      /*
          .form-container {
              width: 300px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }*/
  
          /* Style untuk label */
          label {
              font-weight: bold;
          }

            .h3 {
                position : relative;
                font-size: 15px;
            }
            
            /* Style saat hover di tombol submit */
            .submit-button:hover {
                background-color: #0056b3;
    
            }
            
        </style>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hasil Sorting</title>
        <link rel="stylesheet" href="styles.css">
    </head>
    <body>
        <div class="container">
            <pre>
                <h2>Nomor ID WhatsApp yang valid :</h2>
${dataArray3Links}
                <h3 class="h3" >------------------------------------\n\nOperator : ${indexoperator}\nDigit : ${range}\nTarget : ${targeto}\n\n${count} / ${targeto} nomor yang valid\nPersentase : ${persentase}%\n\n------------------------------------</h3>
            </pre>
            <form method="post" action="/download">
            <label for="type">Download TXT:</label>
            <select class="form-select" id="type" name="type">
                <option selected>Choose...</option>
                <option value="1">My Result TXT</option>
                <option value="2">All User TXT</option>
            </select>
            <div class="button-container">
            <input type="submit" class="submit-button" value="Download txt"/>
        </div>
            </form>
            <form method="get" action="/">
                <div class="button-container">
                    <input type="submit" class="submit-button" value="Back Home"/>
                </div>
            </form>
        </div>
    </body>
    </html>    
`;

res.send(htmlload);
datastringmatang = "";
dataArray2.length = 0
dataArray3.length = 0

});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
