import {NextRequest, NextResponse} from 'next/server'
import {GraphQLClient, gql} from 'graphql-request'

const endpoint = 'https://api.ksubbotin.ru/graphql'
const client = new GraphQLClient(endpoint)

export async function POST(req: NextRequest) {
    const {author, comment, postId} = await req.json()
    const CREATE_COMMENT = gql`
      mutation CREATE_COMMENT {
      createComment(input: {
        commentOn: ${postId}, 
        content: "${comment}", 
        author: "${author}"
      }) {
        success
        comment {
          id
          content
          author {
            node {
              name
            }
          }
        }
      }
    }
    `

    try {
        await client.request(CREATE_COMMENT, {
            author,
            comment,
            commentOn: postId,
        })
        return NextResponse.json({success: true})
    } catch (error) {
        console.error(error)
        return NextResponse.json({success: false}, {status: 500})
    }
}
