import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { AiFillHeart, AiFillDelete } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { BsFillBookmarkFill } from "react-icons/bs";
import {  useState } from "react";
// import { MyContext } from "../context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

//   const IMAGE =
//     'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';

const PostCard = ({ post, reFetchData }) => {
  // const { userData } = useContext(MyContext);
  const userData = JSON.parse(localStorage.getItem("user-profile"));
  const [isLiked, setIsLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const handleDelete = () => {
    const options = {
      method: "DELETE",
      url: `http://localhost:1337/post/${post.id}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);

          alert(response.data.message);
          navigate("/");
          reFetchData();
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleLike = () => {
    const options = {
      method: "GET",
      url: `http://localhost:1337/like/${post.id}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setIsLiked(!isLiked);
          if (isLiked) {
            toast.success("dislike");
          } else {
            toast.success("liked");
          }
          navigate("/");
          reFetchData();
        } else {
          toast.error("something went wrong");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSave = () => {
    const options = {
      method: "GET",
      url: `http://localhost:1337/save/${post.id}`,
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };
    axios
      .request(options)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setSaved(!saved);
          if (saved) {
            toast.success("saved");
          } else {
            toast.success("un saved");
          }
          navigate("/");
          reFetchData();
        } else {
          toast.error("something went wrong");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Center py={12}>
      <Toaster />
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        {post.image !== "" && (
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${post.image})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={post.image}
            />
          </Box>
        )}
        <Stack pt={10} align={"center"} alignItems={"left"}>
          <Stack direction={"row"} alignSelf={"right"}>
            <Stack direction={"row"} spacing={4} align={"center"}>
              <Avatar size="xs" src={post.postBy.profilePic} alt={"Author"} />
              <Text
                color={"gray.500"}
                fontSize={"sm"}
                textTransform={"uppercase"}
              >
                {post.postBy.username}
              </Text>
            </Stack>
          </Stack>

          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            {post.caption}
          </Heading>
          <Stack direction={"row"}>
            <Stack
              direction={"row"}
              align={"center"}
              alignItems={"center"}
              justifyContent={"center"}
              w={16}
            >
              <Text fontSize={"sm"}>{post.likes}</Text>
              <Button variant={"unstyled"} onClick={handleLike}>
                <AiFillHeart color={isLiked ? "red" : "gray"} />
              </Button>
            </Stack>
            <Stack direction={"row"} align={"center"}>
              <Text color={"gray.600"} fontSize={"sm"}>
                {post.saves}
              </Text>
              <Button variant={"unstyled"} onClick={handleSave}>
                <BsFillBookmarkFill color={saved ? "black" : "gray"} />
              </Button>
            </Stack>
            <Stack direction={"row"} align={"center"}>
              <Text color={"gray.600"} fontSize={"sm"}>
                {post.shares}
              </Text>
              <Button variant={"unstyled"} onClick={handleDelete}>
                <FaShare color="blue" />
              </Button>
            </Stack>
            {userData.id === post.postBy.id && (
              <Stack direction={"row"} alignSelf={"end"}>
                <Button
                  variant={"unstyled"}
                  color={"red"}
                  onClick={handleDelete}
                >
                  <AiFillDelete color="red" />
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};
export default PostCard;
