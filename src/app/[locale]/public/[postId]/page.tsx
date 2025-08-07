import {
    AllPublicPostsResponse,
    CommentsPostResponse, LikesPostResponse,
    PostItemsResponse,
    PublicPostsResponse
} from '@/features/public/publicPost/api';
import {PublicPost} from '@/features/public/publicPost/ui/PublicPost';


type Params = {
    pageSize: number
    sortBy: string
    sortDirection: string
}

type UserPostsRequest = {
    userId: number
    endCursorPostId?: number
    params?: Params
}
const getPosts

    = async ({params, userId, endCursorPostId}: UserPostsRequest): Promise<AllPublicPostsResponse | null> => {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/posts/user/${userId}/${endCursorPostId}`,
        {
            cache: 'no-store',
        }
    );


    return response.json();
}

const getPost = async (postId: number): Promise<PostItemsResponse> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/id/${postId}`, {
        cache: 'no-store',
    });


    return response.json();
}

const getPostsWithPagination = async (param: string): Promise<PublicPostsResponse> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${param}`, {
        cache: 'no-store',
    });


    return response.json();
}

const getPostComments = async (postId: number): Promise<CommentsPostResponse | null> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${postId}/comments`, {
        cache: 'no-store',
    });


    return response.json();
}

const getPostAnswers = async (postId: number, commentId: number): Promise<PublicPostsResponse> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${postId}/comments/${commentId}/answers`, {
        cache: 'no-store',
    });


    return response.json();
}

const getPostAnswerLikes = async (postId: number, commentId: number, answerId: number): Promise<PublicPostsResponse> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${postId}/comments/${commentId}/answers/${answerId}/likes`, {
        cache: 'no-store',
    });


    return response.json();
}


const getPostCommentLikes = async (postId: number, commentId: number): Promise<CommentsPostResponse> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${postId}/comments/${commentId}/likes`, {
        cache: 'no-store',
    });


    return response.json();
}

const getPostLikes = async (postId: number): Promise<LikesPostResponse> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/posts/${postId}/likes`, {
        cache: 'no-store',
    });


    return response.json();
}


type ProfileRequest = {
    params: { locale: string; postId: string, commentId: string };

};

export default async function PublicPage({params}: ProfileRequest) {
    const postId = parseInt(params.postId)
    const postPromise = await getPost(postId);
    const commentsPromise = await getPostComments(postId);
    const likesPostPromise = await getPostLikes(postId);

    const [post, comments,likes] = await Promise.all([
        postPromise,
        commentsPromise,
        likesPostPromise,

    ])



    return <div>
        <PublicPost post={post} comments={comments} likes={likes}  />
    </div>
}
