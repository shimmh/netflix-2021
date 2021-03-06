import { IShowDetail } from "Routes/DetailRoute";
import styled from "styled-components";
import { useState } from "react";
import { SectionGrid } from "Components/module/Section";
import Poster from "Components/module/Poster";
import { settingsSimilarImg, StyledSlider } from "Components/module/Carousel";
import { Section } from "Components/module/Section";
import { IShowProps } from "Routes/ShowRoute";

interface IImage {
  bgImage: string;
}
const Container = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  /* position: relative; */
  padding: 20px 150px;
  font-size: 14px;
`;

const Backdrop = styled.div<IImage>`
  /* position: absolute; */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: -1;
`;
const Tab = styled.div`
  display: flex;
  width: 50%;
`;
const Menu = styled.div`
  padding: 10px;
  font-size: 13px;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
  position: relative;
  outline: none;
  margin-bottom: 3%;
  color: ${(props) => props.theme.color.text};
  &.active {
    font-weight: 700;
    transition: font-weight 0.5s ease-in-out;
  }

  &.active::before {
    content: "";
    display: block;
    position: absolute;
    top: 28px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% + 2px);
    height: 5px;
    opacity: 0.7;
    background: ${(props) => props.theme.color.purple};
  }
`;
const Content = styled.div`
  display: flex;
  width: 100%;
  z-index: 0;
  height: 100%;
  display: none;
  &.active-content {
    display: flex;
  }
`;

const Cover = styled.div<IImage>`
  width: 29%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 80%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  height: 80%;
  margin-left: 3%;
`;

const DataHeader = styled.div`
  margin-top: 3%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const SLink = styled.div`
  background-color: #cf550e;
  margin-left: 10px;
  font-size: 12px;
  padding: 6px;
  font-weight: 400;
  border-radius: 4px;
`;

// const Imdb = styled.div`
//   margin-left: 10px;
//   color: black;
//   font-weight: 900;
//   letter-spacing: -0.7px;
//   background-color: #e2b617;
//   padding: 6px 6px 2px 6px;
//   border-radius: 4px;
//   font-size: 12px;
// `;

const ItemContainer = styled.div`
  margin: 20px 0;
`;
const Item = styled.div``;
const ItemName = styled.div`
  display: inline-block;
  padding-bottom: 8px;
  width: 10%;
`;

const ItemValue = styled.span`
  line-height: 150%;
  i {
    color: ${(props) => props.theme.color.red};
    opacity: 0.7;
    font-size: 13px;
  }
`;

const Overview = styled.div`
  margin-top: 3%;
`;

const Video = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  iframe {
    margin-right: 3%;
    margin-bottom: 3%;
  }
`;

/////////////////////////////////////

const Creators = styled.div`
  width: 50%;
  display: flex;
  justify-content: left;
`;

const Creator = styled.div`
  margin-right: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Profile = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 30%;
  overflow: hidden;
  border: solid 3px rgba(255, 255, 255, 0.1);

  img {
    width: 100%;
    height: 100%;
  }
`;

const CreatorName = styled.span`
  padding-top: 5px;
  font-size: 12px;
`;

const Seasons = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  font-size: 12px;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Season = styled.div``;
const Image = styled.div`
  width: 130px;
  height: 180px;
  border-radius: 10%;
  overflow: hidden;
  border: solid 3px rgba(255, 255, 255, 0.2);
  margin-bottom: 2%;
  img {
    width: 100%;
    height: 100%;
  }
`;

const SeasonItem = styled.div`
  padding-left: 5%;
`;

const Similar = styled.div`
  margin-top: -6%;
  display: none;
  &.active-content {
    display: block;
  }
`;

const DetailShow = ({ detail, similar }: IShowDetail) => {
  const rating = detail.vote_average / 2;
  let [decimalPart, remainPart] = [
    rating.toString().split(".")[0],
    rating.toString().split(".")[1],
  ];

  const [toggle, setToggle] = useState<number>(1);
  const toggleTabs = (index: number) => {
    setToggle(index);
  };
  return (
    <>
      <Container>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${detail.backdrop_path}`}
        />

        <Tab>
          <Menu
            className={toggle === 1 ? "active" : ""}
            onClick={() => toggleTabs(1)}
          >
            ?????? ??????
          </Menu>
          <Menu
            className={toggle === 2 ? "active" : ""}
            onClick={() => toggleTabs(2)}
          >
            ?????? ??????
          </Menu>
          <Menu
            className={toggle === 3 ? "active" : ""}
            onClick={() => toggleTabs(3)}
          >
            ?????? ??????
          </Menu>
        </Tab>
        <Content className={toggle === 1 ? "active-content" : ""}>
          <Cover
            bgImage={
              detail.poster_path
                ? `https://image.tmdb.org/t/p/original${detail.poster_path}`
                : require("../../../assets/img/noPosterSmall.png").default
            }
          />
          <Data>
            <DataHeader>
              <Title>{detail.name}</Title>
              <a
                href={detail.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SLink>Homepage</SLink>
              </a>
            </DataHeader>
            <ItemContainer>
              <Item>
                <ItemName>??????</ItemName>
                <ItemValue>
                  {detail.production_countries &&
                    detail.production_countries.map((country, index) =>
                      index === detail.production_countries.length - 1
                        ? country.name
                        : `${country.name} /`
                    )}
                </ItemValue>
              </Item>
              <Item>
                <ItemName>??????</ItemName>
                <ItemValue>
                  {[...Array(Number.parseInt(decimalPart))].map((x, i) => (
                    <i key={i} className="fas fa-star" />
                  ))}
                  {remainPart && <i className="fas fa-star-half" />}
                  {"  "}
                  {detail.vote_average}/10
                </ItemValue>
              </Item>
              <Item>
                <ItemName>??????</ItemName>
                <ItemValue>
                  {detail.genres?.map((genre, index) =>
                    index === detail.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
                </ItemValue>
              </Item>
              <Item>
                <ItemName>??????</ItemName>
                <ItemValue>
                  {detail.networks?.map((network) => network.name)}
                </ItemValue>
              </Item>
              <Item>
                <ItemName>?????????</ItemName>
                <Creators>
                  {detail.created_by?.map((person, index) => (
                    <Creator key={index}>
                      <Profile>
                        {person.profile_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                            alt="creator"
                          />
                        )}
                      </Profile>
                      <CreatorName>{person.name}</CreatorName>
                    </Creator>
                  ))}
                </Creators>
              </Item>
              <Overview>
                <ItemValue>{detail.overview}</ItemValue>
              </Overview>
            </ItemContainer>
          </Data>
        </Content>

        <Content className={toggle === 2 ? "active-content" : ""}>
          <Video>
            {detail.videos.results?.map((video, index) =>
              video.site === "YouTube" ? (
                <iframe
                  key={index}
                  width="25%"
                  height="30%"
                  frameBorder="0"
                  allowFullScreen={true}
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              ) : (
                <div>???????????? ????????????.</div>
              )
            )}
          </Video>
        </Content>
        <Content className={toggle === 3 ? "active-content" : ""}>
          <Seasons>
            <SectionGrid title="">
              {detail.seasons?.map((season, index) => (
                <Season key={index}>
                  <Image>
                    {season.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/original${season.poster_path}`}
                        alt="season"
                      />
                    )}
                  </Image>
                  <SeasonItem>
                    {detail.name} {season.name}
                  </SeasonItem>
                  <SeasonItem>{season.air_date}</SeasonItem>
                  <SeasonItem>{season.episode_count} ??????</SeasonItem>
                </Season>
              ))}
            </SectionGrid>
          </Seasons>
        </Content>
      </Container>
      <Similar className={toggle === 1 ? "active-content" : ""}>
        <Section title="????????? ?????????">
          <StyledSlider {...settingsSimilarImg}>
            {similar?.map((show: IShowProps) => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.name}
                rating={show.vote_average}
                isMovie={false}
                isSmall={true}
              />
            ))}
          </StyledSlider>
        </Section>
      </Similar>
    </>
  );
};

export default DetailShow;
