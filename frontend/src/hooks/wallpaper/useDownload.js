export const useDownload = () => {
    const download = async (wallpaper, isPending, setIsPending) => {
        if (!isPending) {
            setIsPending(true)
            const response = await fetch(process.env.REACT_APP_PROXY + '/api/wallpapers/download/' + wallpaper._id, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const imageBlog = await response.blob()
            const imageURL = URL.createObjectURL(imageBlog)

            const link = document.createElement('a')
            link.href = imageURL;
            link.download = wallpaper.title + ".jpg";

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)  

            setIsPending(false)
        }
    }

    return {download};
}