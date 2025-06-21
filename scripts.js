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
                "IMG_1313.JPG", "IMG_1315.JPG", "IMG_1312.JPG", "IMG_1316.JPG", "IMG_1317.JPG", "IMG_1318.JPG",
                "IMG_1319.JPG", "IMG_1320.JPG", "IMG_1321.JPG", "IMG_1322.JPG", "IMG_1160.JPG", "IMG_1161.JPG",
                "IMG_1162.JPG", "IMG_1163.JPG", "IMG_1169.JPG", "IMG_1170.JPG", "IMG_1171.JPG", "IMG_1172.JPG",
                "IMG_1173.JPG", "IMG_1174.JPG", "IMG_1185.JPG", "IMG_1186.JPG", "IMG_1189.JPG", "IMG_1190.JPG",
                "IMG_1191.JPG", "IMG_1194.JPG", "IMG_1195.JPG", "IMG_1196.JPG", "IMG_1197.JPG", "IMG_1198.JPG",
                "IMG_1199.JPG", "IMG_1200.JPG", "IMG_1201.JPG", "IMG_1202.JPG", "IMG_1203.JPG", "IMG_1204.JPG",
                "IMG_1205.JPG", "IMG_1206.JPG", "IMG_1207.JPG", "IMG_1208.JPG", "IMG_1209.JPG", "IMG_1210.JPG",
                "IMG_1211.JPG", "IMG_1212.JPG", "IMG_1213.JPG", "IMG_1214.JPG", "IMG_1215.JPG", "IMG_1216.JPG",
                "IMG_1217.JPG", "IMG_1218.JPG", "IMG_1219.JPG", "IMG_1220.JPG", "IMG_1221.JPG", "IMG_1222.JPG",
                "IMG_1223.JPG", "IMG_1224.JPG", "IMG_1225.JPG", "IMG_1226.JPG", "IMG_1227.JPG", "IMG_1228.JPG",
                "IMG_1229.JPG", "IMG_1230.JPG", "IMG_1231.JPG", "IMG_1232.JPG", "IMG_1233.JPG", "IMG_1234.JPG",
                "IMG_1235.JPG", "IMG_1236.JPG", "IMG_1237.JPG", "IMG_1241.JPG", "IMG_1242.JPG", "IMG_1243.JPG",
                "IMG_1244.JPG", "IMG_1245.JPG", "IMG_1246.JPG", "IMG_1248.JPG", "IMG_1249.JPG", "IMG_1250.JPG",
                "IMG_1251.JPG", "IMG_1252.JPG", "IMG_1253.JPG", "IMG_1254.JPG", "IMG_1255.JPG", "IMG_1256.JPG",
                "IMG_1257.JPG", "IMG_1258.JPG", "IMG_1259.JPG", "IMG_1260.JPG", "IMG_1261.JPG", "IMG_1265.JPG",
                "IMG_1266.JPG", "IMG_1267.JPG", "IMG_1268.JPG", "IMG_1269.JPG", "IMG_1270.JPG", "IMG_1271.JPG",
                "IMG_1272.JPG", "IMG_1274.JPG", "IMG_1275.JPG", "IMG_1276.JPG", "IMG_1277.JPG",
                "IMG_1278.JPG", "IMG_1279.JPG", "IMG_1280.JPG", "IMG_1281.JPG", "IMG_1282.JPG", "IMG_1283.JPG",
                "IMG_1284.JPG", "IMG_1285.JPG", "IMG_1286.JPG", "IMG_1287.JPG", "IMG_1288.JPG", "IMG_1289.JPG",
                "IMG_1290.JPG", "IMG_1291.JPG", "IMG_1292.JPG", "IMG_1293.JPG", "IMG_1294.JPG", "IMG_1295.JPG",
                "IMG_1296.JPG", "IMG_1297.JPG", "IMG_1298.JPG", "IMG_1299.JPG", "IMG_1300.JPG", "IMG_1301.JPG",
                "IMG_1302.JPG", "IMG_1303.JPG", "IMG_1304.JPG", "IMG_1305.JPG", "IMG_1306.JPG", "IMG_1309.JPG",
                "IMG_1310.JPG", "IMG_1311.JPG"
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