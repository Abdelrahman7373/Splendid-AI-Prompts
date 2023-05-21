import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, {params}) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Post Not Found!!", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, {params}) => {
    const {prompt,tag} = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Post not found!!", { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response("Post is successfully updated", { status: 200 });
    } catch (error) {
        return new Response("Can't update this post!!", { status: 500 });
    }
};

export const DELETE = async (request, {params}) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Post deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Post is not deleted!!", { status: 500 });
    }
};