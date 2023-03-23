const { postClient } = require('../sanityClient')
module.exports.getWorld = async(req, res) => {
    const { _id } = req.query;
    const userDoc = await postClient.fetch(`*[_type == "user" && id == "${_id}"]{
        images[]{
            asset->{
                url
            }
        }
    }`)
    return res.render("memolia", {userDoc: JSON.stringify(userDoc[0].images)})
}