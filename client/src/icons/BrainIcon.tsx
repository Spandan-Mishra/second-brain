import React from 'react';

const sizeVariants = {
  "sm": 30,
  "md": 50,
  "lg": 70
}

export const BrainIcon = ({ size }) => {
  return <svg stroke='currentColor' fill='currentColor' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={sizeVariants[size]} height={sizeVariants[size]} viewBox="0 0 48 48">
    <path d="M 19.091797 2.9277344 C 18.709458 2.9176188 18.308205 2.9307127 17.900391 2.984375 C 17.084762 3.0916997 16.239922 3.3628135 15.457031 3.9355469 C 14.102193 4.9266953 13.378403 6.8380668 13.173828 9.4023438 C 12.107206 9.7549257 9.7292642 10.628322 7.3691406 12.763672 C 5.8883619 14.103424 4.5610551 15.92699 4.1621094 18.263672 C 3.7796217 20.503957 4.3660971 23.119796 6.078125 25.953125 C 5.73655 27.025319 5.5 28.185346 5.5 29.5 C 5.5 33.96875 7.7357501 36.793234 9.9179688 38.248047 C 11.255669 39.139847 12.397615 39.518224 13.238281 39.734375 C 13.503883 41.606988 14.182639 43.135886 15.380859 43.931641 C 16.853891 44.909901 18.520312 44.986788 19.986328 45 C 21.383117 45.01254 22.731578 44.633689 23.78125 43.779297 C 23.864679 43.711389 23.941056 43.63474 24.019531 43.560547 C 24.098007 43.63474 24.174383 43.711389 24.257812 43.779297 C 25.307485 44.633689 26.655945 45.012544 28.052734 45 C 29.51875 44.98679 31.187125 44.9099 32.660156 43.931641 C 33.858377 43.135886 34.535179 41.606988 34.800781 39.734375 C 35.641448 39.518224 36.783394 39.139847 38.121094 38.248047 C 40.303312 36.793234 42.539062 33.96875 42.539062 29.5 C 42.539062 28.184671 42.304797 27.023781 41.962891 25.951172 C 43.673735 23.118794 44.261284 20.503311 43.878906 18.263672 C 43.479961 15.92699 42.152654 14.103424 40.671875 12.763672 C 38.313301 10.629724 35.93547 9.7576086 34.867188 9.4042969 C 34.66294 6.8387578 33.937278 4.9269941 32.582031 3.9355469 C 31.799141 3.3628135 30.9543 3.0916997 30.138672 2.984375 C 29.323043 2.8770503 28.535813 2.9325836 27.867188 3.0097656 C 26.550767 3.1623177 25.296356 3.7086739 24.296875 4.5898438 C 24.197332 4.6776034 24.113779 4.7870812 24.019531 4.8828125 C 23.925283 4.7870812 23.84173 4.6776034 23.742188 4.5898438 C 22.742705 3.7086739 21.488294 3.1623177 20.171875 3.0097656 C 19.837561 2.971175 19.474136 2.93785 19.091797 2.9277344 z M 19.048828 5.9355469 C 19.297649 5.9403688 19.558188 5.9590754 19.828125 5.9902344 C 20.513706 6.0696824 21.257794 6.3990136 21.757812 6.8398438 C 22.257831 7.2806743 22.5 7.7551138 22.5 8.2675781 L 22.5 40.046875 C 22.5 40.762306 22.28225 41.132768 21.888672 41.453125 C 21.495094 41.773482 20.843883 42.007456 20.013672 42 C 18.705688 41.98821 17.622531 41.821083 17.039062 41.433594 C 16.455595 41.046104 16 40.453917 16 38.5 A 1.50015 1.50015 0 0 0 14.699219 37.013672 C 14.699219 37.013672 13.149813 36.797141 11.582031 35.751953 C 10.01425 34.706766 8.5 33.03125 8.5 29.5 C 8.5 25.96875 10.05513 24.150653 11.667969 23.523438 C 13.280807 22.896221 15.042017 23.320028 16.212891 25.271484 A 1.5006123 1.5006123 0 1 0 18.787109 23.728516 C 16.957983 20.679972 13.469193 19.603778 10.582031 20.726562 C 9.553466 21.126561 8.6695496 21.870127 7.8847656 22.757812 C 7.2371642 21.208851 6.9363355 19.838294 7.1191406 18.767578 C 7.3764449 17.26051 8.2366381 16.021576 9.3808594 14.986328 C 11.669302 12.915832 14.912109 11.941406 14.912109 11.941406 A 1.50015 1.50015 0 0 0 16 10.5 C 16 7.7569167 16.648547 6.7797519 17.228516 6.3554688 C 17.5185 6.1433272 17.899582 6.0208159 18.341797 5.9667969 C 18.562904 5.9397874 18.800007 5.930725 19.048828 5.9355469 z M 28.992188 5.9355469 C 29.241008 5.9307249 29.478111 5.9397871 29.699219 5.9667969 C 30.141434 6.0208159 30.520563 6.1433272 30.810547 6.3554688 C 31.390515 6.7797519 32.039062 7.7569167 32.039062 10.5 A 1.50015 1.50015 0 0 0 33.126953 11.941406 C 33.126953 11.941406 36.369761 12.915832 38.658203 14.986328 C 39.802424 16.021576 40.662618 17.26051 40.919922 18.767578 C 41.102727 19.838294 40.803851 21.208851 40.15625 22.757812 C 39.371395 21.869926 38.487704 21.126621 37.458984 20.726562 C 34.571823 19.603779 31.083032 20.679972 29.253906 23.728516 A 1.50015 1.50015 0 1 0 31.826172 25.271484 C 32.997046 23.320028 34.758255 22.896221 36.371094 23.523438 C 37.983932 24.150652 39.539062 25.96875 39.539062 29.5 C 39.539062 33.03125 38.024813 34.706766 36.457031 35.751953 C 34.88925 36.797141 33.341797 37.013672 33.341797 37.013672 A 1.50015 1.50015 0 0 0 32.039062 38.5 C 32.039062 40.453917 31.583469 41.046104 31 41.433594 C 30.416531 41.821083 29.335328 41.988212 28.027344 42 C 27.197133 42.0075 26.545922 41.773482 26.152344 41.453125 C 25.758766 41.132768 25.539062 40.762306 25.539062 40.046875 L 25.539062 8.2675781 C 25.539062 7.7551138 25.781231 7.2806738 26.28125 6.8398438 C 26.781269 6.3990136 27.52731 6.0696823 28.212891 5.9902344 C 28.482827 5.9590749 28.743367 5.9403688 28.992188 5.9355469 z M 19.054688 11.980469 A 1.50015 1.50015 0 0 0 17.544922 13.863281 C 17.544922 13.863281 17.653308 14.485713 17.470703 14.972656 C 17.288101 15.459599 17.1 16 15 16 A 1.50015 1.50015 0 1 0 15 19 C 17.9 19 19.7119 17.540401 20.279297 16.027344 C 20.846693 14.514287 20.455078 13.136719 20.455078 13.136719 A 1.50015 1.50015 0 0 0 19.054688 11.980469 z M 29.089844 11.980469 A 1.50015 1.50015 0 0 0 27.583984 13.136719 C 27.583984 13.136719 27.192369 14.514287 27.759766 16.027344 C 28.327162 17.540401 30.139063 19 33.039062 19 A 1.50015 1.50015 0 1 0 33.039062 16 C 30.939062 16 30.752917 15.459599 30.570312 14.972656 C 30.387709 14.485713 30.496094 13.863281 30.496094 13.863281 A 1.50015 1.50015 0 0 0 29.089844 11.980469 z M 15.078125 28.9375 C 14.511551 28.9426 14.136719 29.044922 14.136719 29.044922 A 1.50015 1.50015 0 1 0 14.863281 31.955078 C 14.863281 31.955078 15.366734 31.860128 15.830078 32.091797 C 16.293422 32.323469 17 32.833333 17 35.5 A 1.50015 1.50015 0 1 0 20 35.5 C 20 32.166667 18.706578 30.176531 17.169922 29.408203 C 16.401594 29.024039 15.644699 28.932352 15.078125 28.9375 z M 32.962891 28.9375 C 32.396317 28.9324 31.637469 29.02404 30.869141 29.408203 C 29.332484 30.176531 28.039063 32.166667 28.039062 35.5 A 1.50015 1.50015 0 1 0 31.039062 35.5 C 31.039062 32.833333 31.747593 32.323469 32.210938 32.091797 C 32.674281 31.860125 33.175781 31.955078 33.175781 31.955078 A 1.50015 1.50015 0 1 0 33.904297 29.044922 C 33.904297 29.044922 33.529465 28.942648 32.962891 28.9375 z"></path>
  </svg>
}
