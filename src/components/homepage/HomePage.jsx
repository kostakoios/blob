import Header from '../header/Header';
import FileMenu from '../fileMenu/FileMenu';
import FoldersLayout from '../foldersLayout/FoldersLayout';
import FileDisplay from '../filedisplay/FileDisplay';

const HomePage = () => {
  console.log()
  return (
    <div>
      <Header />
      <FileMenu />
      <FileDisplay />
      <FoldersLayout />
    </div>
  );
};

export default HomePage;
