let x = 0;
let y = 0;

let step = 0;
let it = 0;

let drawToggle = false;

const data = {
  distance: [],
  averageDistance: [],
  log: [],
  coordinates: []
};

// Data Generation
for (let i = 10; i < 100000; i *= 10) {
  let distanceData = [];

  let itCoordinates = [];
  // Loops through 20 iterations
  for (let j = 0; j < 20; j++) {
    x = 0;
    y = 0;

    let coordinate = {
      xpos: [],
      ypos: []
    };

    //  Generates random walk data
    for (let k = 0; k < i; k++) {
      let r = Math.floor(Math.random() * Math.floor(4));
      switch (r) {
        // East
        case 0: {
          x = x + 1;
          break;
        }
        // West
        case 1: {
          x = x - 1;
          break;
        }
        // North
        case 2: {
          y = y + 1;
          break;
        }
        // South
        case 3: {
          y = y - 1;
          break;
        }
      }
      coordinate.xpos.push(x);
      coordinate.ypos.push(y);
    }
    // Push calculated distance into distance array
    distanceData.push(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));

    // Add coordinates to data
    itCoordinates.push(coordinate);
  }

  let totalDistance = 0;

  distanceData.forEach(function(distance) {
    totalDistance += distance;
  });

  let distanceAverage = totalDistance / 20;
  data.averageDistance.push(distanceAverage);
  data.log.push(Math.log(distanceAverage));
  data.coordinates.push(itCoordinates);
}

// Line Graph
var ctx = document.getElementById("distance-graph").getContext("2d");
let distanceGraph = new Chart(ctx, {
  type: "line",
  data: {
    labels: [10, 100, 1000, 10000],
    datasets: [
      {
        label: "Distance from Origin",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: data.averageDistance,
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Random Walk Distance from Origin"
    },
    tooltips: {
      mode: "index",
      intersect: false
    },
    hover: {
      mode: "nearest",
      intersect: true
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Number of Steps"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Distance from Origin"
          }
        }
      ]
    }
  }
});

var ctx = document.getElementById("log-graph").getContext("2d");
let logGraph = new Chart(ctx, {
  type: "line",
  data: {
    labels: [10, 100, 1000, 10000],
    datasets: [
      {
        label: "Log of Distance",
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgb(54, 162, 235)",
        data: data.log,
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Log Random Walk Distance from Origin"
    },
    tooltips: {
      mode: "index",
      intersect: false
    },
    hover: {
      mode: "nearest",
      intersect: true
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Number of Steps"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Distance from Origin"
          }
        }
      ]
    }
  }
});

console.log(data.coordinates);
console.log(data.coordinates[0][0].xpos[0]);

// P5
window.setup = function() {
  let cnv = createCanvas(800, 800);
  cnv.parent("random-walk");
  background(175);
  buffer = createGraphics(800, 800);
  buffer.background(175);
  buffer.translate(400, 400);
  document.getElementById("generate").addEventListener("click", function() {
    step = document.getElementById("steps").options[steps.selectedIndex].value;
    it = document.getElementById("iteration").options[iteration.selectedIndex]
      .value;
    drawToggle = true;

    console.log(step);
    console.log(it);
  });
};

window.draw = function() {
  stroke(50);
  strokeWeight(3);

  if (drawToggle) {
    buffer.clear();
    background(175);
    imageMode(CORNER);
    image(buffer, 0, 0, 800, 800);
    let oldx = 400;
    let oldy = 400;

    for (i = 0; i < data.coordinates[step][it].xpos.length; i++) {
      line(
        oldx,
        oldy,
        oldx + data.coordinates[step][it].xpos[i],
        oldy + data.coordinates[step][it].ypos[i]
      );
      fill(0);

      oldx += data.coordinates[step][it].xpos[i];
      oldy += data.coordinates[step][it].ypos[i];
    }
    drawToggle = false;
  }
};
