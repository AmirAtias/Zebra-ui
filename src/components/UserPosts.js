/* eslint-disable react/jsx-key */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { Comment, Header, Container } from "semantic-ui-react";

const UserPosts = props => {
  const containerCss = css({
    backgroundColor: "white"
  });
  const comments = css({
    paddingLeft: "10%"
  });
  return (
    <div>
      <Comment.Group css={containerCss}>
        {props.posts.map(post => (
          <div>
            {post.postContent !== "" ? (
              <div>
                <Comment>
                  <Comment.Avatar src="https://www.kids-world.com/images/MK436.jpg" />
                  <Comment.Content>
                    <Comment.Author as="a">{post.postHeader} </Comment.Author>
                    <Comment.Metadata>
                      <div>Today at 5:42PM</div>
                    </Comment.Metadata>
                    <Comment.Text>{post.postContent}</Comment.Text>
                  </Comment.Content>
                </Comment>
                {post.comments.length > 0 && (
                  <Header as="h5" style={{ paddingLeft: "10%" }} dividing>
                    {" "}
                    Comments:
                  </Header>
                )}
                {post.comments.map(comment => (
                  <Container css={comments}>
                    <Comment>
                      <Comment.Avatar src="https://www.kids-world.com/images/MK436.jpg" />
                      <Comment.Content>
                        <Comment.Author as="a">Matt</Comment.Author>
                        <Comment.Metadata>
                          <div>Today at 5:42PM</div>
                        </Comment.Metadata>
                        <Comment.Text>{comment}</Comment.Text>
                      </Comment.Content>
                      <hr />
                    </Comment>
                  </Container>
                ))}
              </div>
            ) : null}
          </div>
        ))}
        ;
      </Comment.Group>
    </div>
  );
};
export default UserPosts;
