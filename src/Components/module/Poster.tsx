import styled from "styled-components";
import { Link } from "react-router-dom";

interface IPoster {
  key: number;
  id: number;
  imageUrl: string;
  title: string;
  rating: number;
  isMovie: boolean;
  isSmall: boolean;
}

interface IImage {
  bgUrl: string;
  size: string;
}

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div<IImage>`
  background-image: url(${(props) => props.bgUrl});
  height: ${(props) => props.size};
  width: 100%;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  background-repeat: no-repeat;
  transition: opacity 0.1s linear;
`;

const Like = styled.span`
  visibility: hidden;
  position: absolute;
  top: 15px;
  left: 10px;
  opacity: 0;
  color: white;
  cursor: pointer;
  transition: opacity 0.1s linear;

  &.small {
    top: 0px;
    left: 0px;
  }

  &.clicked {
    color: tomato;
  }
`;

const Rating = styled.span`
  visibility: hidden;
  bottom: 5px;
  right: 5px;
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s linear;
  color: white;
  font-weight: 400;
  i {
    color: ${(props) => props.theme.color.red};
    opacity: 0.9;
  }
`;

const InnerTitle = styled.span`
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  opacity: 0;
  transition: opacity 0.1s linear;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  width: 100%;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }

    ${Like} {
      opacity: 1;
      visibility: visible;
    }

    ${Rating} {
      visibility: visible;
      opacity: 1;
    }

    ${InnerTitle} {
      opacity: 1;
    }
  }
`;

const ImageSmallContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.7;
      transform: scale(1.1);
    }

    ${Rating} {
      visibility: visible;
      opacity: 1;
      bottom: 20px;
    }

    ${InnerTitle} {
      opacity: 1;
    }
    ${Like} {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Title = styled.span`
  display: block;
  margin-top: 10px;
  margin-left: 3px;
  margin-bottom: 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Poster = ({ id, imageUrl, title, rating, isMovie, isSmall }: IPoster) => {
  const handleLike = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const element = event.target as HTMLInputElement;
    element.parentElement?.classList.toggle("clicked");
  };
  return (
    <Container>
      {isSmall ? (
        <ImageSmallContainer>
          <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
            <Image
              bgUrl={
                imageUrl
                  ? `https://image.tmdb.org/t/p/w300${imageUrl}`
                  : require("../../assets/img/noPosterSmall.png").default
              }
              size="180px"
            />
          </Link>
          <Like className="small" onClick={handleLike}>
            <i className="fas fa-heart fa-lg" />
          </Like>
          <Rating>
            <i className="fas fa-star"></i> {rating}/10
          </Rating>
          <Title>{title}</Title>
        </ImageSmallContainer>
      ) : (
        <ImageContainer>
          <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
            <Image
              bgUrl={
                imageUrl
                  ? `https://image.tmdb.org/t/p/w300${imageUrl}`
                  : require("../../assets/img/noPosterSmall.png").default
              }
              size="360px"
            />
          </Link>
          <Like onClick={handleLike}>
            <i className="fas fa-heart fa-lg" />
          </Like>

          <Rating>
            <i className="fas fa-star"></i> {rating}/10
          </Rating>
          <InnerTitle>{title}</InnerTitle>
        </ImageContainer>
      )}
    </Container>
  );
};
export default Poster;
