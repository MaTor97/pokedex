import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Display(props) {
  props.pokemons;

  return (
    <div className="display">
      <InfiniteScroll
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}  //function returning =>  Initial data = [1, 2, 3] and then next load of data should be [1, 2, 3, 4, 5, 6].
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Time to catch them all !!!</b>
          </p>
        }
        // below props only if you need pull down functionality
        refreshFunction={this.refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
        }
      >
        {items}
      </InfiniteScroll>
    </div>
  );
}

export default Display;
