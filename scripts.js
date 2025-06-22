document.addEventListener('DOMContentLoaded', () => {
    // Modal logic variables
    const photoModal = new bootstrap.Modal(document.getElementById('photoModal'));
    const modalImage = document.getElementById('modalImage');
    const heartBtn = document.getElementById('heartBtn');
    const heartIcon = document.getElementById('heartIcon');
    const heartCount = document.getElementById('heartCount');
    let currentImg = "";

    const shareFacebook = document.getElementById('shareFacebook');
    const shareInstagram = document.getElementById('shareInstagram');
    const copyLink = document.getElementById('copyLink');
    const copyMsg = document.getElementById('copyMsg');

    // Store heart counts per image
    const heartCounts = {};

    loadGallery();

    function loadGallery() {
        const gallery = document.getElementById('gallery-images');
        if (gallery) {
            const images = [
                "IMG_1313.PNG", "IMG_1315.PNG", "IMG_1312.PNG", "IMG_1316.PNG", "IMG_1317.PNG", "IMG_1318.PNG",
                "IMG_1319.PNG", "IMG_1320.PNG", "IMG_1321.PNG", "IMG_1322.PNG", "IMG_1160.PNG", "IMG_1161.PNG",
                "IMG_1162.PNG", "IMG_1163.PNG", "IMG_1169.PNG", "IMG_1170.PNG", "IMG_1171.PNG", "IMG_1172.PNG",
                "IMG_1173.PNG", "IMG_1174.PNG", "IMG_1185.PNG", "IMG_1186.PNG", "IMG_1189.PNG", "IMG_1190.PNG",
                "IMG_1191.PNG", "IMG_1194.PNG", "IMG_1195.PNG", "IMG_1196.PNG", "IMG_1197.PNG", "IMG_1198.PNG",
                "IMG_1199.PNG", "IMG_1200.PNG", "IMG_1201.PNG", "IMG_1202.PNG", "IMG_1203.PNG", "IMG_1204.PNG",
                "IMG_1205.PNG", "IMG_1206.PNG", "IMG_1207.PNG", "IMG_1208.PNG", "IMG_1209.PNG", "IMG_1210.PNG",
                "IMG_1211.PNG", "IMG_1212.PNG", "IMG_1213.PNG", "IMG_1214.PNG", "IMG_1215.PNG", "IMG_1216.PNG",
                "IMG_1217.PNG", "IMG_1218.PNG", "IMG_1219.PNG", "IMG_1220.PNG", "IMG_1221.PNG", "IMG_1222.PNG",
                "IMG_1223.PNG", "IMG_1224.PNG", "IMG_1225.PNG", "IMG_1226.PNG", "IMG_1227.PNG", "IMG_1228.PNG",
                "IMG_1229.PNG", "IMG_1230.PNG", "IMG_1231.PNG", "IMG_1232.PNG", "IMG_1233.PNG", "IMG_1234.PNG",
                "IMG_1235.PNG", "IMG_1236.PNG", "IMG_1237.PNG", "IMG_1241.PNG", "IMG_1242.PNG", "IMG_1243.PNG",
                "IMG_1244.PNG", "IMG_1245.PNG", "IMG_1246.PNG", "IMG_1248.PNG", "IMG_1249.PNG", "IMG_1250.PNG",
                "IMG_1251.PNG", "IMG_1252.PNG", "IMG_1253.PNG", "IMG_1254.PNG", "IMG_1255.PNG", "IMG_1256.PNG",
                "IMG_1257.PNG", "IMG_1258.PNG", "IMG_1259.PNG", "IMG_1260.PNG", "IMG_1261.PNG", "IMG_1265.PNG",
                "IMG_1266.PNG", "IMG_1267.PNG", "IMG_1268.PNG", "IMG_1269.PNG", "IMG_1270.PNG", "IMG_1271.PNG",
                "IMG_1272.PNG", "IMG_1274.PNG", "IMG_1275.PNG", "IMG_1276.PNG", "IMG_1277.PNG",
                "IMG_1278.PNG", "IMG_1279.PNG", "IMG_1280.PNG", "IMG_1281.PNG", "IMG_1282.PNG", "IMG_1283.PNG",
                "IMG_1284.PNG", "IMG_1285.PNG", "IMG_1286.PNG", "IMG_1287.PNG", "IMG_1288.PNG", "IMG_1289.PNG",
                "IMG_1290.PNG", "IMG_1291.PNG", "IMG_1292.PNG", "IMG_1293.PNG", "IMG_1294.PNG", "IMG_1295.PNG",
                "IMG_1296.PNG", "IMG_1297.PNG", "IMG_1298.PNG", "IMG_1299.PNG", "IMG_1300.PNG", "IMG_1301.PNG",
                "IMG_1302.PNG", "IMG_1303.PNG", "IMG_1304.PNG", "IMG_1305.PNG", "IMG_1306.PNG", "IMG_1309.PNG",
                "IMG_1310.PNG", "IMG_1311.PNG"

            ];
            images.forEach(img => heartCounts[img] = 0);

            const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
            const maxImages = isIndexPage ? 6 : images.length;

            images.slice(0, maxImages).forEach((src, index) => {
                const col = document.createElement('div');
                col.className = 'col-md-4 col-sm-6 position-relative';

                // Container for image and overlay
                const container = document.createElement('div');
                container.className = 'gallery-img-container position-relative overflow-hidden rounded-4 mb-3';

                // The image
                const img = document.createElement('img');
                img.src = `photos/${src}`;
                img.alt = 'Gallery Image';
                img.className = 'gallery-img img-fluid w-100 d-block';
                img.loading = 'lazy';

                // Overlay for buttons
                const overlay = document.createElement('div');
                overlay.className = 'gallery-overlay d-flex justify-content-center align-items-end';

                overlay.innerHTML = `
                    <div class="gallery-btns d-flex justify-content-center gap-2 w-100 pb-3">
                        <button class="btn btn-outline-light btn-sm gallery-heart" title="Heart"><i class="fa-regular fa-heart"></i></button>
                        <a href="photos/${src}" download class="btn btn-outline-light btn-sm" title="Download"><i class="fa fa-download"></i></a>
                        <button class="btn btn-outline-light btn-sm gallery-share" title="Share"><i class="fa fa-share-nodes"></i></button>
                    </div>
                `;

                // Attach event listener for share button
                overlay.querySelector('.gallery-share').addEventListener('click', function(e) {
                    e.preventDefault();
                    const imgUrl = window.location.origin + `/photos/${src}`;
                    // Share the direct image URL on Facebook
                    window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(imgUrl)}`,
                        '_blank'
                    );
                });

                container.appendChild(img);
                container.appendChild(overlay);
                col.appendChild(container);
                gallery.appendChild(col);
            });
        }
    }

    function showModal(src) {
        currentImg = src;
        modalImage.src = `photos/${src}`;
        updateHeart();
        // Facebook share link
        const url = window.location.origin + '/photos/' + src;
        shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        // Instagram: can't share directly, but can open Instagram
        shareInstagram.href = `https://www.instagram.com/`;
        // Copy link
        copyLink.onclick = function() {
            navigator.clipboard.writeText(url).then(() => {
                copyMsg.style.display = 'block';
                setTimeout(() => copyMsg.style.display = 'none', 1500);
            });
        };
        photoModal.show();
    }

    function updateHeart() {
        heartCount.textContent = heartCounts[currentImg];
        if (localStorage.getItem('hearted_' + currentImg)) {
            heartIcon.className = 'fa-solid fa-heart';
            heartBtn.classList.add('active');
        } else {
            heartIcon.className = 'fa-regular fa-heart';
            heartBtn.classList.remove('active');
        }
    }

    heartBtn.addEventListener('click', function () {
        if (!localStorage.getItem('hearted_' + currentImg)) {
            heartCounts[currentImg]++;
            localStorage.setItem('hearted_' + currentImg, '1');
        } else {
            heartCounts[currentImg]--;
            localStorage.removeItem('hearted_' + currentImg);
        }
        updateHeart();
    });

    // Tooltip initialization (optional)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});