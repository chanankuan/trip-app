import React from 'react';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Weather <span className={styles.span}>Forecast</span>
      </h1>

      <SearchBar onFilterChange={onFilterChange} />

      <CardList>
        {filteredTrips.map(({ id, city, imageUrl, startDate, endDate }) => {
          return (
            <CardItem key={id}>
              <Trip
                city={city}
                imageUrl={imageUrl}
                startDate={startDate}
                endDate={endDate}
                isActive={activeIndex === id}
                onShow={() => setActiveIndex(id)}
              />
            </CardItem>
          );
        })}
        <CardItem key="addButton">
          <button className={styles.addTripBtn} onClick={openModal}>
            <FaPlus />
            Add trip
          </button>
        </CardItem>
      </CardList>

      {activeIndex && (
        <WeatherForecast
          city={selectedTrip?.city || ''}
          startDate={selectedTrip?.startDate || ''}
          endDate={selectedTrip?.endDate || ''}
          isActive={activeIndex !== null}
        />
      )}
    </div>
  );
};

export default Home;
