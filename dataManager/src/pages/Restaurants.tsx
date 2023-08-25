/* Library Imports */
//React
import React, { useEffect, useState } from 'react';
//React Query
import { useQuery } from 'react-query';

/* Stylesheet Imports */

/* Image Imports */

/* Component Imports */
import ActionBar from 'src/components/actionBar/ActionBar';
import AddMenu from 'src/components/addMenu/AddMenu';
import CardGrid from 'src/components/cardGrid/CardGrid';
import CSVUploader from 'src/components/csvUploader/CSVUploader';
import Footer from 'src/components/footer/Footer';
import NavBar from 'src/components/navBar/NavBar';

/* Module Imports */
import { getRestaurants } from '../modules/api';
import { apiToCard } from 'src/modules/converters';

/* Component Interfaces */

/* Component/Functions */
const Restaurants = () => {
  //State to store pafe mode
  const [mode, setMode] = useState<string>('view');

  //State to store converted query data
  const [rests, setRests] = useState<any[]>([]);

  //Logic for db query
  const restQuery = useQuery({
    queryKey: ['restaurants'],
    queryFn: getRestaurants,
  });

  //Effect for converting query to card grid format
  useEffect(() => {
    if (restQuery.isSuccess) {
      const objects = restQuery.data.map((rest: any) => {
        return apiToCard(rest);
      });
      setRests(objects);
    }
  }, [restQuery.data]);

  //Variable for storing rendered page content
  let renderedContent;

  //Logic for rendering cards grid
  let renderedRests;
  //If parts are loading
  if (restQuery.isLoading) {
    renderedRests = <p>Loading...</p>;
  }
  //If parts are in error
  if (restQuery.isError) {
    renderedRests = <p className="errMsg">{`Error: ${restQuery.error}`}</p>;
  }
  //If parts are loaded
  if (restQuery.isSuccess && mode === 'edit') {
    //logic to convert queries to card grid
    renderedRests = <CardGrid mode="edit" items={rests} />;
  }
  if (restQuery.isSuccess && mode === 'view') {
    //logic to convert queries to card grid
    renderedRests = <CardGrid mode="view" items={rests} />;
  }

  if (mode === 'add') {
    renderedContent = (
      <React.Fragment>
        <ActionBar
          actions={[
            { text: 'Add', action: () => setMode('add'), active: true },
            { text: 'Edit', action: () => setMode('edit'), active: false },
            { text: 'View', action: () => setMode('view'), active: false },
          ]}
        />
        <AddMenu
          dataType="restaurant"
          bulkAction={() => setMode('csv')}
          singleAction={() => {}}
        />
      </React.Fragment>
    );
  }

  if (mode === 'edit') {
    renderedContent = (
      <React.Fragment>
        <ActionBar
          actions={[
            { text: 'Add', action: () => setMode('add'), active: false },
            { text: 'Edit', action: () => setMode('edit'), active: true },
            { text: 'View', action: () => setMode('view'), active: false },
          ]}
        />
        {renderedRests}
      </React.Fragment>
    );
  }

  if (mode === 'view') {
    renderedContent = (
      <React.Fragment>
        <ActionBar
          actions={[
            { text: 'Add', action: () => setMode('add'), active: false },
            { text: 'Edit', action: () => setMode('edit'), active: false },
            { text: 'View', action: () => setMode('view'), active: true },
          ]}
        />
        {renderedRests}
      </React.Fragment>
    );
  }

  if (mode === 'csv') {
    renderedContent = (
      <React.Fragment>
        <ActionBar
          actions={[
            { text: 'Add', action: () => setMode('add'), active: true },
            { text: 'Edit', action: () => setMode('edit'), active: false },
            { text: 'View', action: () => setMode('view'), active: false },
          ]}
        />
        <CSVUploader />
      </React.Fragment>
    );
  }

  //Function return statement
  return (
    <div className="Restaurants page">
      {/* Header Start */}
      <header>
        <NavBar
          links={[
            { name: 'HOME', link: '/', active: false },
            { name: 'TABLES', link: '/tables', active: false },
          ]}
        />
      </header>
      {/* Header End */}
      {/* Content Start */}
      <div className="mainContent">{renderedContent}</div>
      {/* Content End */}
      {/* Footer Start */}
      <Footer />
      {/* Footer End */}
    </div>
  );
};

/* Export Statement */
export default Restaurants;
