
interface Link {
    url: string;
    newTab: boolean;
}
interface NavigationEntry {
    icons: string[];
    title: string;
    caption?: string;
    childNodes?: NavigationEntry[];
    link?: string | Link;
}

const navigationListStore: NavigationEntry[] = [
    {
        icons: ["fal", "fa-globe"],
        title: "sidebar.social-networks",
        caption: "sidebar.social-networks-caption",
        childNodes: [{
            icons: ["fal", "fa-thumbs-up"],
            title: "sidebar.facebook",
            caption: "sidebar.facebook-caption",
            childNodes: [{
                icons: ["fal", "fa-share-alt"],
                title: "sidebar.facebook-new-tab",
                caption: "sidebar.facebook-new-tab-caption",
                link: {
                    url: "https://facebook.com",
                    newTab: true,
                },
            }, {
                icons: ["fal", "fa-share-alt"],
                title: "sidebar.facebook-redirect",
                caption: "sidebar.facebook-redirect-caption",
                link: {
                    url: "https://facebook.com",
                    newTab: false,
                },
            }],
        },
        {
            icons: ["fal", "fa-code-merge"],
            title: "sidebar.github-new-tab",
            link: {
                url: "http://github.com",
                newTab: true,
            },
        }],
    },
    {
        icons: ["fal", "fa-list-ol"],
        title: "Helpers",
        link: "/helpers",
    },
    {
        icons: ["fal", "fa-users"],
        title: "Users",
        link: "/users",
    },
    {
        icons: ["fal", "fa-home"],
        title: "Home",
        link: "/home",
    },
];

export default navigationListStore;
export {
    Link,
    NavigationEntry,
};

