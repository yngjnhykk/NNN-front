import PropTypes from 'prop-types';
import Link from 'next/link';

function PostCardContent({ postData }) {
  console.log(postData);
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((item, index) => {
        if (item.match(/(#[^\s#]+)/)) {
          return (
            <Link href={`/hashtag/${item.slice(1)}`} key={index}>
              {item}
            </Link>
          );
        }
        return item;
      })}
    </div>
  );
}

export default PostCardContent;

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};
