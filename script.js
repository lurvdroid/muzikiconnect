// Sample posts list (you will replace with real ones)
const posts = [
    {
        title: "Grammy-winning, Kenyan-American rapper KayCyy returns...",
        image: "assets/images/kcy.jpg",
        link: "posts/2025-11-21-grammy-kaycy.html",
        category: "gossip"
    },
    
    {
        title: "Singer Charisma acquires luxury car",
        image: "assets/images/charisma.jpg",
        link: "posts/2025-11-21-charisma-gossip.html",
        category: "gossip"
    },


    {
        title: "Otile Brown Drops New Hit — Fans Go Wild",
        image: "assets/images/post2.jpg",
        link: "posts/sample-post.html",
        category: "music"
    },
    {
        title: "Comedian Flaqo Signs Big Brand Deal",
        image: "assets/images/post3.jpg",
        link: "posts/sample-post.html",
        category: "entertainment"
    }
];

const postsContainer = document.getElementById("posts-container");
const trendingList = document.getElementById("trending-list");
const latestList = document.getElementById("latest-list");

posts.forEach(post => {
    // Add to main grid
    postsContainer.innerHTML += `
        <div class="post-card">
            <a href="${post.link}">
                <img src="${post.image}">
            </a>
            <div class="post-info">
                <h2>${post.title}</h2>
            </div>
        </div>
    `;

    // Sidebar
    trendingList.innerHTML += `<li><a href="${post.link}">${post.title}</a></li>`;
    latestList.innerHTML += `<li><a href="${post.link}">${post.title}</a></li>`;
});
