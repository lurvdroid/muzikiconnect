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
        title: "Sauti Sol's Live and Die In Africa #LADIA 10th  Anniversary ",
        image: "assets/images/ladiasol.jpg",
        link: "posts/2025-11-21-ladia-sautisol.html",
        category: "gossip"
    },
    {
        title: "Luciano Concert:Reggae legend Luciano is in Nairobi",
        image: "assets/images/luciano.jpg",
        link: "posts/2025-11-21-luciano.html",
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
